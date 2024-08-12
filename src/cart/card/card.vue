<template>
  <div class="jp-card-container">
    <div class="jp-card" :class="cardClass">
      <div class="jp-card-front">
        <div class="jp-card-logo jp-card-elo">
          <div class="e">e</div>
          <div class="l">l</div>
          <div class="o">o</div>
        </div>
        <div class="jp-card-logo jp-card-visa">Visa</div>
        <div class="jp-card-logo jp-card-visaelectron">Visa<div class="elec">Electron</div></div>
        <div class="jp-card-logo jp-card-mastercard">Mastercard</div>
        <div class="jp-card-logo jp-card-maestro">Maestro</div>
        <div class="jp-card-logo jp-card-amex"></div>
        <div class="jp-card-logo jp-card-discover">discover</div>
        <div class="jp-card-logo jp-card-unionpay">UnionPay</div>
        <div class="jp-card-logo jp-card-dinersclub"></div>
        <div class="jp-card-logo jp-card-hipercard">Hipercard</div>
        <div class="jp-card-logo jp-card-troy">troy</div>
        <div class="jp-card-logo jp-card-dankort">
          <div class="dk">
            <div class="d"></div>
            <div class="k"></div>
          </div>
        </div>
        <div class="jp-card-logo jp-card-jcb">
          <div class="j">J</div>
          <div class="c">C</div>
          <div class="b">B</div>
        </div>
        <div class="jp-card-lower">
          <div class="jp-card-shiny"></div>
          <div class="jp-card-cvc jp-card-display">{{props.cvc}}</div>
          <div class="jp-card-number jp-card-display">{{props.number}}</div>
          <div class="jp-card-name jp-card-display">{{props.name}}</div>
          <div class="jp-card-expiry jp-card-display" data-before="{{props.monthYear}}" data-after="{{props.validDate}}">{{props.expiry}}</div>
        </div>
      </div>
      <div class="jp-card-back">
        <div class="jp-card-bar"></div>
        <div class="jp-card-cvc jp-card-display">{{cvc}}</div>
        <div class="jp-card-shiny"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'card/dist/card.css';
import { computed } from 'vue';
import { CardType } from './payment';

const props = defineProps<{
  cvc: string;
  number: string;
  name: string;
  expiry: string;
  monthYear: string;
  validDate: string;
  cardType: CardType | 'unknown';
  flipped: boolean;
  isValid: boolean;
}>();

const cardClass = computed(() => {
  const classes = [`jp-card-${props.cardType}`];
  if (props.cardType !== 'unknown') {
    classes.push('jp-card-identified');
  }
  if (props.flipped) {
    classes.push('jp-card-flipped');
  }
  if (props.isValid) {
    classes.push('jp-card-valid');
  } else {
    classes.push('jp-card-invalid');
  }

  return classes.join(' ');
});

</script>