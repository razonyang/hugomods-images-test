<template>
  <select placeholder="State" autocomplete="shipping address-level1" autocorrect="off"
    aria-required="true" v-bind="$attrs" v-model="model">
    <option disabled="true">State</option>
    <option value="AL">Alabama</option>
    <option value="AK">Alaska</option>
    <option value="AS">American Samoa</option>
    <option value="AZ">Arizona</option>
    <option value="AR">Arkansas</option>
    <option value="CA">California</option>
    <option value="CO">Colorado</option>
    <option value="CT">Connecticut</option>
    <option value="DE">Delaware</option>
    <option value="FL">Florida</option>
    <option value="GA">Georgia</option>
    <option value="GU">Guam</option>
    <option value="HI">Hawaii</option>
    <option value="ID">Idaho</option>
    <option value="IL">Illinois</option>
    <option value="IN">Indiana</option>
    <option value="IA">Iowa</option>
    <option value="KS">Kansas</option>
    <option value="KY">Kentucky</option>
    <option value="LA">Louisiana</option>
    <option value="ME">Maine</option>
    <option value="MH">Marshall Islands</option>
    <option value="MD">Maryland</option>
    <option value="MA">Massachusetts</option>
    <option value="MI">Michigan</option>
    <option value="FM">Micronesia</option>
    <option value="MN">Minnesota</option>
    <option value="MS">Mississippi</option>
    <option value="MO">Missouri</option>
    <option value="MT">Montana</option>
    <option value="NE">Nebraska</option>
    <option value="NV">Nevada</option>
    <option value="NH">New Hampshire</option>
    <option value="NJ">New Jersey</option>
    <option value="NM">New Mexico</option>
    <option value="NY">New York</option>
    <option value="NC">North Carolina</option>
    <option value="ND">North Dakota</option>
    <option value="MP">Northern Mariana Islands</option>
    <option value="OH">Ohio</option>
    <option value="OK">Oklahoma</option>
    <option value="OR">Oregon</option>
    <option value="PW">Palau</option>
    <option value="PA">Pennsylvania</option>
    <option value="PR">Puerto Rico</option>
    <option value="RI">Rhode Island</option>
    <option value="SC">South Carolina</option>
    <option value="SD">South Dakota</option>
    <option value="TN">Tennessee</option>
    <option value="TX">Texas</option>
    <option value="VI">U.S. Virgin Islands</option>
    <option value="UT">Utah</option>
    <option value="VT">Vermont</option>
    <option value="VA">Virginia</option>
    <option value="WA">Washington</option>
    <option value="DC">Washington DC</option>
    <option value="WV">West Virginia</option>
    <option value="WI">Wisconsin</option>
    <option value="WY">Wyoming</option>
    <option value="AA">Armed Forces Americas</option>
    <option value="AE">Armed Forces Europe</option>
    <option value="AP">Armed Forces Pacific</option>
  </select>
</template>

<script lang="ts" setup>

  const model = defineModel();

</script>