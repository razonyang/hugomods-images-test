// var Payment, QJ, cardFromNumber, cardFromType, cards, cursorSafeAssignValue, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, formatMonthExpiry, globalThis, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictCombinedExpiry, restrictExpiry, restrictMonthExpiry, restrictNumeric, restrictYearExpiry, setCardType,
//   indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

const defaultFormat = /(\d{1,4})/g;
const cards = [{
  type: 'amex' as const,
  pattern: /^3[47]/,
  format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  mask: "#### ###### #####",
  length: [15],
  cvcLength: [4],
  cvcMask: '####',
  luhn: true
}, {
  type: 'dinersclub' as const,
  pattern: /^(36|38|30[0-5])/,
  format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
  length: [14],
  mask: "#### ###### ####",
  cvcLength: [3],
  cvcMask: '###',
  luhn: true
}, {
  type: 'discover' as const,
  pattern: /^(6011|65|64[4-9]|622)/,
  format: defaultFormat,
  length: [16],
  mask: "#### #### #### ####",
  cvcLength: [3],
  cvcMask: '###',
  luhn: true
}, {
  type: 'jcb' as const,
  pattern: /^(308[8-9]|309[0-3]|3094[0]{4}|309[6-9]|310[0-2]|311[2-9]|3120|315[8-9]|333[7-9]|334[0-9]|35)/,
  format: defaultFormat,
  length: [16, 19],
  mask: "#### #### #### #### 000",
  cvcLength: [3],
  cvcMask: '###',
  luhn: true
}, {
  type: 'mastercard' as const,
  pattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
  format: defaultFormat,
  length: [16],
  mask: "#### #### #### ####",
  cvcLength: [3],
  cvcMask: '###',
  luhn: true
}, {
  type: 'visa' as const,
  pattern: /^4/,
  format: defaultFormat,
  mask: "#### #### #### ####",
  length: [13, 16],
  cvcLength: [3],
  cvcMask: '###',
  luhn: true
}];
export type CardType = typeof cards[number]['type'];
export type CardTypeInfo = typeof cards[number];

export function cardFromNumber(num: string) {
  // var card, foundCard, j, len, match;
  num = (num + '').replace(/\D/g, '');
  let foundCard: [CardTypeInfo, RegExpMatchArray] | null = null;
  for (const card of cards) {
    const match = num.match(card.pattern);
    if (match && (!foundCard || match[0].length > foundCard[1][0].length)) {
      foundCard = [card, match];
    }
  }
  return foundCard?.[0];
};

function cardFromType(type: CardType) {
  return cards.find(c => c.type === type);
};

function luhnCheck(num: string) {
  var digit, digits, j, len, odd, sum;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (j = 0, len = digits.length; j < len; j++) {
    digit = digits[j];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

export function getCardType(num: string) {
  const ref = cardFromNumber(num);
  return ref?.type || null;
}

// function setCardType(e: Event): void {
//   const target = e.target as HTMLInputElement;
//   const val = target.value;
//   const cardType = getCardType(val) || 'unknown';
//   if (!target.classList.contains(cardType)) {
//     const allTypes = Payment.cards.map(card => card.type);
//     target.classList.remove('unknown');
//     target.classList.remove(...allTypes);
//     target.classList.add(cardType);
//     target.classList.toggle('identified', cardType !== 'unknown');
//     target.dispatchEvent(new CustomEvent('payment.cardType', { detail: cardType }));
//   }
// }

function formatCardNumber(num: string) {
  var card, groups, ref, upperLength;
  card = cardFromNumber(num);
  if (!card) {
    return num;
  }
  upperLength = card.length[card.length.length - 1];
  num = num.replace(/\D/g, '');
  num = num.slice(0, upperLength);
  if (card.format.global) {
    const matches = num.match(card.format);
    if (matches) {
      return matches.join(' ');
    } else {
      return num;
    }
  } else {
    groups = card.format.exec(num);
    if (groups == null) {
      return num;
    }
    groups.shift();
    groups = groups.filter(function (n) {
      return n;
    });
    return groups.join(' ');
  }
}
export function cardExpiryVal(value: string) {
  var month, prefix, ref, year;
  value = value.replace(/\s/g, '');
  ref = value.split('/', 2), month = ref[0], year = ref[1];
  if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
    prefix = (new Date).getFullYear();
    prefix = prefix.toString().slice(0, 2);
    year = prefix + year;
  }
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  return {
    month: month,
    year: year
  };
}
export function validateCardNumber(num: string): boolean {
  num = num.replace(/\s+|-/g, '');
  if (!/^\d+$/.test(num)) {
    return false;
  }
  const card = cardFromNumber(num);
  if (!card) {
    return false;
  }
  return card.length.includes(num.length) && (card.luhn === false || luhnCheck(num));
}
export function validateCardCVC(cvc: string, type: CardType) {
  cvc = cvc.trim();
  if (!/^\d+$/.test(cvc)) {
    return false;
  }
  const tCard = type && cardFromType(type);
  if (tCard) {
    return tCard.cvcLength.includes(cvc.length);
  } else {
    return cvc.length >= 3 && cvc.length <= 4;
  }
}
