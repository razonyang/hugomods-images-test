

export interface ULSRecord {
  type: string;
  u_id: number;
  callsign: string;
  licensee_id: string;
  first_name: string;
  middle_initial: string;
  last_name: string;
  suffix: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  pobox: string;
  frn: string;
  applicant_type: string;
  license_status: string;
  grant_date: string;
  expired_date: string;
  effective_date: string;
  cancellation_date: string | null;
  license_class: string;
  prev_license_class: string;
}

export async function doUlsLookup(callsign: string) {
  const url = `https://exam.tools/api/uls/lookup/${callsign}`;
  const resp = await fetch(url);

  const data = await resp.json() as ULSRecord;
  return data;
}
