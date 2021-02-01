<template>
  <div>
    <v-container fluid>
      <v-data-table
          :headers="headers"
          :items="csmoneyItemsFiltered"
          class="elevation-1"
          :footer-props="footerProps"
          :items-per-page="50"

      >
        <template slot="no-data">
          <div>
            {{ $t('no_data_text') }}
          </div>
        </template>
        <template #item="{ item, index }">
          <tr
              :key="index"
              :class="[item.isNew ? 'isNewItem' : '', item.isSelected ? 'isSelectedItem' : '']"
              v-bind="fromNewToOld(item)"
          >
            <td v-if="item.copySucceeded === true">
              <v-tooltip color="success" v-model="item.copySucceeded" top>
                <template #activator="{ attrs }">
                  <button v-clipboard:copy="item.name" v-bind="attrs">
                    {{ item.name }}
                  </button>
                </template>
                <span>{{ $t('succesfully_copied') }}</span>
              </v-tooltip>
            </td>
            <td v-else>
              <button
                  v-clipboard:copy="item.name"
                  @click="onClickCopyName(item)"
              >
                {{ item.name }}
              </button>
            </td>
            <td v-if="colItemLinkIsShow">
              <v-btn v-if="item.salesData === null" icon :href="item.link" target="_blank">
                <img src="@/assets/csmoney.png"/>
                <div class="sales-amount">{{ item.salesAmount }}</div>
              </v-btn>
              <v-menu
                  v-if="item.salesData"
                  open-on-hover
                  bottom
                  offset-y
                  min-width="275px"
                  max-width="275px"
                  nudge-left="120"
                  offset-overflow
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      :href="item.link" target="_blank"
                  >
                    <img src="@/assets/csmoney.png"/>
                    <div class="sales-amount">{{ item.salesAmount }}</div>
                  </v-btn>
                </template>
                <v-container fluid class="background-img-btn white--text">
                  <v-layout align-center justify-center>
                    <span>{{ $t('number_sales_per_month') }} <span style="color: #00dd00">{{ item.salesAmount }}</span></span>
                  </v-layout>
                  <v-divider color="white" class="my-2"></v-divider>
                  <v-row no-gutters>
                    <v-col>
                      <v-row no-gutters align="center" justify="center">
                        <span> {{ $t('avg_price') }}</span>
                      </v-row>
                      <v-row no-gutters align="center" justify="center">
                        <span style="color: #00dd00">{{ item.salesData['avg_price'] }}$</span>
                      </v-row>
                    </v-col>
                    <v-divider color="white" vertical></v-divider>
                    <v-col>
                      <v-row no-gutters align="center" justify="center">
                        <span>{{ $t('avg_float') }}</span>
                      </v-row>
                      <v-row no-gutters align="center" justify="center">
                        <span style="color: #00dd00">{{ item.salesData['avg_float'] }}</span>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-divider color="white" class="my-2"></v-divider>
                  <v-row no-gutters>
                    <v-col align="center" style="color: #00dd00">{{ $t('price') }}</v-col>
                    <v-col align="center" style="color: #00dd00">Float</v-col>
                    <v-col align="center" style="color: #00dd00">{{ $t('date') }}</v-col>
                  </v-row>
                  <template v-for="(last_sale, idx) in item.salesData['last_sales']">
                    <v-row
                        :key="idx"
                        no-gutters
                        align="center"
                        justify="center"
                    >
                      <v-col align="center">
                        <span>
                          {{ last_sale.price }}$
                        </span>
                      </v-col>
                      <v-col align="center">
                        <span>
                          {{ last_sale.float_value }}
                        </span>
                      </v-col>
                      <v-col align="center">
                        <span>
                          {{ unixTimestampHandler(last_sale.sales_time) }}
                        </span>
                      </v-col>
                    </v-row>
                  </template>
                  <v-divider color="white" class="my-1"></v-divider>
                </v-container>
              </v-menu>
            </td>
            <td
                v-if="
                  colItemPriceIsShow && (item.overPriceFloat || item.overPricePattern || item.overPriceSticker)
                "
            >
              <v-menu
                  open-on-hover
                  bottom
                  offset-y
                  min-width="275px"
                  max-width="275px"
                  nudge-left="120"
              >
                <template #activator="{ on, attrs }">
                  <span
                      style="text-decoration: underline;"
                      v-bind="attrs"
                      v-on="on"
                  >
                    {{ item.price }}$
                  </span>
                </template>
                <v-container fluid class="background-img-btn white--text">
                  <v-layout align-center justify-center>
                    <span>{{ $t('overprice_percent') }}: </span>
                  </v-layout>
                  <v-layout align-center justify-center>
                    <span v-if="item.overPriceFloat && item.overPricePattern && item.overPriceSticker" style="color: #00dd00">
                      (Float +$ and Pattern +$ and Stickers +$)
                    </span>
                    <span v-else-if="item.overPriceFloat && item.overPricePattern" style="color: #00dd00">
                      (Float +$ and Pattern +$)
                    </span>
                    <span v-else-if="item.overPriceFloat && item.overPriceSticker" style="color: #00dd00">
                      (Float +$ and Stickers +$)
                    </span>
                    <span v-else-if="item.overPricePattern && item.overPriceSticker" style="color: #00dd00">
                      (Pattern +$ and Stickers +$)
                    </span>
                    <span v-else-if="item.overPriceFloat" style="color: #00dd00">
                      (Float +$)
                    </span>
                    <span v-else-if="item.overPricePattern" style="color: #00dd00">
                      (Pattern +$)
                    </span>
                    <span v-else-if="item.overPriceSticker" style="color: #00dd00">
                      (Stickers +$)
                    </span>
                  </v-layout>
                  <v-divider v-if="item.overPriceSticker" color="white" class="my-1"></v-divider>
                  <v-row no-gutters align="center" justify="center">
                    <template v-if="item.overPriceSticker" v-for="(sticker, index) in item.stickers">
                      <v-col :key="index" align="center">
                        <v-tooltip color="success" bottom>
                          <template #activator="{ on, attrs }">
                            <v-img
                                v-bind="attrs"
                                v-on="on"
                                contain
                                width="80px"
                                height="80px"
                                :src="sticker.sticker_img_url"
                                v-clipboard:copy="sticker.sticker_name"
                            ></v-img>
                            <span v-if="sticker.sticker_price" style="color: #30d629">
                              +$ {{ sticker.sticker_price }}
                            </span>
                          </template>
                          <span>{{ sticker.sticker_name }}</span>
                        </v-tooltip>
                      </v-col>
                      <v-responsive
                          v-if="index === 1"
                          :key="`width-${index}`"
                          width="100%"
                      ></v-responsive>
                    </template>
                  </v-row>
                  <v-divider v-if="item.overPriceSticker" color="white" class="my-1"></v-divider>
                </v-container>
              </v-menu>
            </td>
            <td
                v-else-if="colItemPriceIsShow && !(item.overPriceFloat || item.overPricePattern || item.overPriceSticker)"
            >
              <v-menu
                  v-if="!!item.stickers"
                  open-on-hover
                  bottom
                  offset-y
                  min-width="275px"
                  max-width="275px"
                  nudge-left="120"
              >
                <template #activator="{ on, attrs }">
                  <span
                      style="text-decoration: underline;"
                      v-bind="attrs"
                      v-on="on"
                  >
                    {{ item.price }}$
                  </span>
                </template>
                <v-container fluid class="background-img-btn white--text">
                  <v-divider color="white" class="my-1"></v-divider>
                  <v-row no-gutters align="center" justify="center">
                    <template v-for="(sticker, index) in item.stickers">
                      <v-col :key="index" align="center">
                        <v-tooltip color="success" bottom>
                          <template #activator="{ on, attrs }">
                            <v-img
                                v-bind="attrs"
                                v-on="on"
                                contain
                                width="80px"
                                height="80px"
                                :src="sticker.sticker_img_url"
                                v-clipboard:copy="sticker.sticker_name"
                            ></v-img>
                            <span v-if="sticker.sticker_price" style="color: #30d629">
                              +$ {{ sticker.sticker_price }}
                            </span>
                          </template>
                          <span>{{ sticker.sticker_name }}</span>
                        </v-tooltip>
                      </v-col>
                      <v-responsive
                          v-if="index === 1"
                          :key="`width-${index}`"
                          width="100%"
                      ></v-responsive>
                    </template>
                  </v-row>
                  <v-divider color="white" class="my-1"></v-divider>
                </v-container>
              </v-menu>
              <span v-if="!item.stickers">{{ item.price }}$</span>
            </td>
            <td v-if="colItemPriceHumanMinimumIsShow && typeof(item.priceHumanMinimum) === 'number'">
              {{ item.priceHumanMinimum }}$
            </td>
            <td v-else-if="colItemPriceHumanMinimumIsShow && !(typeof(item.priceHumanMinimum) === 'number')">
              {{ item.priceHumanMinimum }}
            </td>
            <td v-if="colItemDefaultPriceIsShow">{{ item.defaultPrice }}$</td>
            <td v-if="colItemProfitIsShow">
              <v-chip :color="getColor(item.profit)" dark>
                {{ item.profit }} %
              </v-chip>
            </td>
            <td v-if="colItemFloatIsShow">{{ item.float }}</td>
            <td v-if="colItemDaysLeftIsShow">{{ item.tradeunlock }} {{ $t('filter_days') }}</td>
            <td v-if="colItemStatusIsShow">{{ item.status }}</td>
            <td v-if="colItemTimeAddIsShow">{{ item.time_add }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    headers: {type: Array},
    footerProps: {type: Object},
    csmoneyItemsFiltered: {type: Array},
    profitColorGreen: {type: String},
    profitColorOrange: {type: String},
    colItemLinkIsShow: {type: Boolean},
    colItemPriceIsShow: {type: Boolean},
    colItemPriceHumanMinimumIsShow: {type: Boolean},
    colItemDefaultPriceIsShow: {type: Boolean},
    colItemProfitIsShow: {type: Boolean},
    colItemFloatIsShow: {type: Boolean},
    colItemDaysLeftIsShow: {type: Boolean},
    colItemStatusIsShow: {type: Boolean},
    colItemTimeAddIsShow: {type: Boolean},
  },
  methods: {
    unixTimestampHandler: (unixTimestamp) => {
      return new Date(unixTimestamp * 1000).toLocaleDateString();
    },
    // Метод для подсветки только что залетевшего скинчика
    async fromNewToOld(item) {
      await setTimeout(() => {
        item.isNew = false;
      }, 3000);
    },
    // Цвета для выделения профита
    getColor(profit) {
      if (profit > this.profitColorGreen) {
        return 'green';
      } else if (profit > this.profitColorOrange) {
        return 'orange';
      } else {
        return 'red';
      }
    },
    // Копирование предметов
    async onClickCopyName(item) {
      item.copySucceeded = true;
      item.isSelected = true;

      setTimeout(() => {
        item.copySucceeded = false;
      }, 1000);
    },
  }
}
</script>

<style scoped>
.isNewItem {
  background: rgba(7, 184, 7, 0.64);
}

.sales-amount {
  position: absolute;
  color: #fff;
  font-size: 9px;
  right: -4px;
  bottom: -5px;
  background-color: #20303e;
  padding: 1px 4px;
  border-radius: 5px;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  padding: 4px;
}

.isSelectedItem {
  background-color: #BBDEFB;
}
</style>