
export interface AcceptJS {
  dispatchData(secureData: AuthorizeNetSecureData, responseHandler: (response: AuthorizeNetAcceptResponse) => void): void;
}

export interface AuthorizeNetCardData {
  cardNumber: string;
  month: string;
  year: string;
  cardCode: string;
  zip: string;
  fullName: string;
}
export interface AuthorizeNetBankData {
  accountNumber: string;
  routingNumber: string;
  nameOnAccount: string;
  accountType: "checking" | "savings" | 'businessChecking';
}
export interface AuthorizeNetAuthData {
  clientKey: string;
  apiLoginID: string;
}
export type AuthorizeNetSecureData = {authData: AuthorizeNetAuthData} & ({cardData: AuthorizeNetCardData} | {bankData: AuthorizeNetBankData});

export interface AuthorizeNetAcceptResponse {
  opaqueData: {
    dataDescriptor: 'COMMON.ACCEPT.INAPP.PAYMENT';
    dataValue: string;
  };
  messages: {
    resultCode: "Ok" | "Error";
    message: {
      code: string;
      text: string;
    }[];
  };
}

const debug = true;
const debugLog = debug ? console.warn.bind(console) : () => {};

let acceptObj: AcceptJS | null = null;
let loading: Promise<AcceptJS> | null = null;

const aNetHost = (<any>window).aNetHost as string;
const acceptUrl = `${aNetHost}/v1/Accept.js`;

const Timeout = 10000; // ms to wait for Accept.js to load

let waitLoadTimeout: ReturnType<typeof setTimeout> | null = null;

export async function dispatchData(secureData: AuthorizeNetSecureData): Promise<AuthorizeNetAcceptResponse> {
  const accept = await getAccept();
  if (!accept) {
    throw new Error("Error loading payment system");
  }
  return new Promise((resolve, reject) => {
    accept.dispatchData(secureData, (response: AuthorizeNetAcceptResponse) => {
      debugLog("Accept.js response: ", response);
      if (response.messages.resultCode === "Error") {
        reject(new Error(response.messages.message.map(m => `${m.code}: ${m.text}`).join("\n")));
      } else {
        resolve(response);
      }
    });
  });
}

export async function getAccept() {
  if (acceptObj) { return acceptObj; }
  if (loading) { return await loading; }

  const script = document.createElement("script");
  script.referrerPolicy = "origin";
  script.src = acceptUrl;

  loading = new Promise<AcceptJS>((resolve, reject) => {
    const startTime = new Date().getTime();
    script.onload = () => {
      let found = false;
      for (const s of document.head.querySelectorAll(`script`)) {
        if (s.src.startsWith(aNetHost) && !s.isSameNode(script)) {
          debugLog("Found script tag for ", s.src);
          s.onload = () => {
            debugLog("Detected Accept.js loaded");

            // Clear the timeout
            clearTimeout(waitLoadTimeout!);

            acceptObj = (<any>window).Accept;
            resolve(acceptObj!);
          };
          s.onerror = (ev) => {
            debugLog("Error loading Accept.js");
            reject(new Error("Error loading Accept.js" + ev.toString()));
          }
          break;
        }
      }
      const checkLoaded = () => {
        waitLoadTimeout = null;
        const isLoaded = !(<any>window).Accept?.dispatchData?.toString().includes("Accept.js is not loaded");
        if (!isLoaded) {
          debugLog("Waiting for accept.js to load. Loaded? ", isLoaded);
          // If timeout has elapsed, reject
          if (new Date().getTime() - startTime > Timeout) {
            reject(new Error("Accept.js failed to load"));
            return;
          } else {
            waitLoadTimeout = setTimeout(checkLoaded, 100);
            return;
          }
        }
      }
      // It might be really fast, if it preloaded, but wait up to Timeout to be sure
      waitLoadTimeout = setTimeout(checkLoaded, 50);

    };
  });
  document.head.appendChild(script);

  return loading;
}
