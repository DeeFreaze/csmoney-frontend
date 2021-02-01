<template>
  <div>
    <v-container fluid>
      <v-dialog v-model="dialogFilter" persistent max-width="50%">
        <template #activator="{ on, attrs }">
          <v-btn class="background-img" block color="indigo darken-4" dark v-bind="attrs" v-on="on">
            {{ $t('add_filter_to_table') }}
          </v-btn>
        </template>
        <v-card>
          <v-card-text class="pt-3" style="padding-bottom: 0;">
            <v-row class="ml-2 mr-2">
              <v-col md="3" class="headline pb-0">
                <v-row justify="center" align="center">
                  <span class="mt-3 font-weight-medium">{{ $t('filter_form') }}</span>
                </v-row>
              </v-col>
              <v-divider
                class="mx-4 pb-2"
                inset
                vertical
              ></v-divider>
              <v-col class="pb-0">
                <v-text-field
                  style="width: 98%;"
                  outlined
                  dense
                  append-icon="filter_list"
                  v-model="filterTitle"
                  :label="$t('filter_title')"
                  :hint="$t('filter_title_hint')"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-col id="search" style="padding-bottom: 0;">
              <v-row no-gutters>
                <v-combobox
                  multiple
                  v-model="nameChips"
                  :label="$t('filter_name')"
                  :hint="$t('filter_name_hint')"
                  persistent-hint
                  append-icon="search"
                  chips
                  small-chips
                  dense
                  deletable-chips
                  outlined
                >
                </v-combobox>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-layout align-center justify-center>
              <v-chip-group
                v-model="skinWear"
                color="primary"
                column
                multiple
              >
                <v-chip filter outlined>Factory New</v-chip>
                <v-chip filter outlined>Minimal Wear</v-chip>
                <v-chip filter outlined>Field-Tested</v-chip>
                <v-chip filter outlined>Well-Worn</v-chip>
                <v-chip filter outlined>Battle-Scarred</v-chip>
              </v-chip-group>
            </v-layout>
            <v-divider></v-divider>
            <v-col style="padding-bottom: 0;">
              <v-row no-gutters>
                <v-combobox
                    multiple
                    v-model="stickersChips"
                    :label="$t('sticker_name')"
                    :hint="$t('sticker_name_hint')"
                    persistent-hint
                    append-icon="search"
                    chips
                    small-chips
                    dense
                    deletable-chips
                    outlined
                >
                </v-combobox>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col id="count-sales" style="padding-bottom: 0;">
              <v-row no-gutters>
                <v-text-field
                  style="width: 98%;"
                  outlined
                  dense
                  type="number"
                  append-icon="show_chart"
                  v-model="countSalesValue"
                  :label="$t('filter_count_sales')"
                  :hint="$t('filter_count_sales_hint')"
                  persistent-hint
                ></v-text-field>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col id="bot-price">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    style="width: 99%;"
                    outlined
                    dense
                    type="number"
                    v-model="priceFromFilterValue"
                    suffix="$"
                    :label="$t('filter_bot_price_from')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    type="number"
                    v-model="priceToFilterValue"
                    suffix="$"
                    :label="$t('filter_bot_price_to')"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col id="human-price">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    style="width: 99%;"
                    outlined
                    dense
                    type="number"
                    v-model="priceHumanMinimumFromFilterValue"
                    suffix="$"
                    :label="$t('filter_human_price_min_from')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    type="number"
                    v-model="priceHumanMinimumToFilterValue"
                    suffix="$"
                    :label="$t('filter_human_price_min_to')"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-divider></v-divider>
            <v-col id="profit">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    style="width: 99%;"
                    outlined
                    dense
                    type="number"
                    v-model="profitFromFilterValue"
                    suffix="%"
                    :label="$t('filter_profit_from')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    type="number"
                    v-model="profitToFilterValue"
                    suffix="%"
                    :label="$t('filter_profit_to')"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-divider></v-divider>
            <v-col id="float">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    style="width: 99%;"
                    outlined
                    type="number"
                    step="0.01"
                    dense
                    v-model="floatFromFilterValue"
                    :label="$t('filter_float_from')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    type="number"
                    step="0.01"
                    dense
                    v-model="floatToFilterValue"
                    :label="$t('filter_float_to')"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>

            <v-divider></v-divider>
            <v-col id="daysLeft">
              <v-row no-gutters>
                <v-col>
                  <v-text-field
                    style="width: 99%;"
                    outlined
                    dense
                    type="number"
                    v-model="daysLeftFromFilterValue"
                    :suffix="$t('filter_days')"
                    :label="$t('filter_trade_unlock_time_from')"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    dense
                    type="number"
                    v-model="daysLeftToFilterValue"
                    :suffix="$t('filter_days')"
                    :label="$t('filter_trade_unlock_time_to')"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-4" text @click="dialogFilterClose()">{{
              $t('close')
              }}
            </v-btn>
            <v-btn
              v-if="filterAddStatus === true"
              color="blue darken-4"
              text
              @click="dialogFilterAdd()"
              style="margin-right: 10px;"
            >{{ $t('filter_add') }}
            </v-btn
            >
            <v-btn
              v-else
              color="blue darken-4"
              text
              @click="dialogFilterEdit()"
              style="margin-right: 10px;"
            >{{ $t('filter_edit') }}
            </v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="filtersArr"
      class="elevation-1"
      :footer-props="footerProps"
      :items-per-page="15"
    >
      <template #item="{ item }">
        <tr>
          <td>
            <v-switch
              v-model="item.is_active"
              @click="editItem(item)"
            ></v-switch>
          </td>
          <td>
            {{ item.filter_title_form }}
          </td>
          <td>
            <v-icon
              small
              class="mr-2"
              @click="dialogChipFilterEdit(item)"
            >
              create
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item.id)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {commitAddNotification} from '@/store/main/mutations';
  import {
    getCSMoneyFilters,
    createCSMoneyFilter,
    updateCSMoneyFilter,
    deleteCSMoneyFilter
  } from '@/utils';

  export default {
    data() {
      return {
        filtersArr: [],

        // Filter fields
        filterAddStatus: true,
        dialogFilter: false,

        filterId: 0,
        filterTitle: null,
        nameChips: [],
        skinWear: [0, 1, 2, 3, 4],
        stickersChips: [],
        countSalesValue: null,
        priceFromFilterValue: null,
        priceToFilterValue: null,
        priceHumanMinimumFromFilterValue: null,
        priceHumanMinimumToFilterValue: null,
        profitFromFilterValue: null,
        profitToFilterValue: null,
        floatFromFilterValue: null,
        floatToFilterValue: null,
        daysLeftFromFilterValue: null,
        daysLeftToFilterValue: null,

        footerProps: {
          page: 1,
          'items-per-page-options': [15, 30, 50],
        },
      };
    },
    computed: {
      headers() {
        return [
          {
            text: this.$t('is_active'),
            align: 'left',
            sortable: false,
            value: 'is_active',
            width: '6%',
            fixed: true
          },
          {
            text: this.$t('filter_title'),
            align: 'left',
            sortable: true,
            value: 'filter_title',
          },
          {
            text: this.$t('actions'),
            align: 'left',
            sortable: false,
            value: 'actions',
            width: '6%',
            fixed: true
          },
        ]
      }
    },
    mounted() {
      this.getFiltersHandler();
    },
    methods: {
      async getFiltersHandler() {
        const response = await getCSMoneyFilters(this.$store);
        if (response.data) this.filtersArr = response.data;
      },
      async createFilterHandler(data) {
        const payload = JSON.stringify(data);
        await createCSMoneyFilter(this.$store, payload);
        this.getFiltersHandler();
      },
      async updateFilterHandler(id, data) {
        const payload = JSON.stringify(data);
        await updateCSMoneyFilter(this.$store, id, payload);
      },
      async deleteFilterHandler(id) {
        await deleteCSMoneyFilter(this.$store, id);
        this.getFiltersHandler();
      },
      editItem(filter) {
        this.updateFilterHandler(filter.id, filter);
      },
      deleteItem(id) {
        this.deleteFilterHandler(id);
      },
      // Конструктор для создания объекта-фильтра
      FilterObject() {
        this.name_chips_form = [];
        this.filter_title_form = '';
        this.skin_wear = [];
        this.stickers_chips_form = [];
        this.count_sales_form = null;
        this.price_from_filter_form = null;
        this.price_to_filter_form = null;
        this.price_human_minimum_from_filter_form = null;
        this.price_human_minimum_to_filter_form = null;
        this.profit_from_filter_form = null;
        this.profit_to_filter_form = null;
        this.float_from_filter_form = null;
        this.float_to_filter_form = null;
        this.days_left_from_filter_form = null;
        this.days_left_to_filter_form = null;
      },
      // Добавление объекта-фильтра в массив объектов-фильтров
      dialogFilterAdd: async function () {
        let filterObject = new this.FilterObject();

        !this.filterTitle
          ? (filterObject.filter_title_form = this.$t('filter_title_value'))
          : (filterObject.filter_title_form = this.filterTitle);
        !this.nameChips
          ? (filterObject.name_chips_form = [])
          : (filterObject.name_chips_form = await [].concat(this.nameChips));
        !this.skinWear
          ? (filterObject.skin_wear = [0, 1, 2, 3, 4])
          : (filterObject.skin_wear = await [].concat(this.skinWear));
        !this.stickersChips
            ? (filterObject.stickers_chips_form = [])
            : (filterObject.stickers_chips_form = await [].concat(this.stickersChips));


        if (!!this.countSalesValue) filterObject.count_sales_form = Number(this.countSalesValue);
        if (!!this.priceFromFilterValue) filterObject.price_from_filter_form = Number(this.priceFromFilterValue);
        if (!!this.priceToFilterValue) filterObject.price_to_filter_form = Number(this.priceToFilterValue);
        if (!!this.priceHumanMinimumFromFilterValue) filterObject.price_human_minimum_from_filter_form = Number(this.priceHumanMinimumFromFilterValue);
        if (!!this.priceHumanMinimumToFilterValue) filterObject.price_human_minimum_to_filter_form = Number(this.priceHumanMinimumToFilterValue);
        if (!!this.profitFromFilterValue) filterObject.profit_from_filter_form = Number(this.profitFromFilterValue);
        if (!!this.profitToFilterValue) filterObject.profit_to_filter_form = Number(this.profitToFilterValue);
        if (!!this.floatFromFilterValue) filterObject.float_from_filter_form = Number(this.floatFromFilterValue);
        if (!!this.floatToFilterValue) filterObject.float_to_filter_form = Number(this.floatToFilterValue);
        if (!!this.daysLeftFromFilterValue) filterObject.days_left_from_filter_form = Number(this.daysLeftFromFilterValue);
        if (!!this.daysLeftToFilterValue) filterObject.days_left_to_filter_form = Number(this.daysLeftToFilterValue);

        let resultEmptyFilterFields = await this.checkEmptyFields();
        if (resultEmptyFilterFields) {
          await commitAddNotification(this.$store, {
            content: this.$t('alert_filter_required_fields'),
            color: 'red',
          });
          return;
        }
        await this.createFilterHandler(filterObject);

        this.dialogFilter = false;
        await this.clearDataFilter();
      },
      async dialogFilterEdit() {
        for (let arrayItem of this.filtersArr) {
          if (arrayItem.id === this.filterId) {
            !this.filterTitle
              ? (arrayItem.filter_title_form = this.$t('filter_title_value'))
              : (arrayItem.filter_title_form = this.filterTitle);
            !this.nameChips
              ? (arrayItem.name_chips_form = [])
              : (arrayItem.name_chips_form = await [].concat(this.nameChips));
            !this.skinWear
              ? (arrayItem.skin_wear = [0, 1, 2, 3, 4])
              : (arrayItem.skin_wear = await [].concat(this.skinWear));
            !this.stickersChips
                ? (arrayItem.stickers_chips_form = [])
                : (arrayItem.stickers_chips_form = await [].concat(this.stickersChips));

            !!this.countSalesValue
                ? (arrayItem.count_sales_form = Number(this.countSalesValue))
                : (arrayItem.count_sales_form = null);
            !!this.priceFromFilterValue
                ? (arrayItem.price_from_filter_form = Number(this.priceFromFilterValue))
                : (arrayItem.price_from_filter_form = null);
            !!this.priceToFilterValue
                ? (arrayItem.price_to_filter_form = Number(this.priceToFilterValue))
                : (arrayItem.price_to_filter_form = null);
            !!this.priceHumanMinimumFromFilterValue
                ? (arrayItem.price_human_minimum_from_filter_form = Number(this.priceHumanMinimumFromFilterValue))
                : (arrayItem.price_human_minimum_from_filter_form = null);
            !!this.priceHumanMinimumToFilterValue
                ? (arrayItem.price_human_minimum_to_filter_form = Number(this.priceHumanMinimumToFilterValue))
                : (arrayItem.price_human_minimum_to_filter_form = null);
            !!this.profitFromFilterValue
                ? (arrayItem.profit_from_filter_form = Number(this.profitFromFilterValue))
                : (arrayItem.profit_from_filter_form = null);
            !!this.profitToFilterValue
                ? (arrayItem.profit_to_filter_form = Number(this.profitToFilterValue))
                : (arrayItem.profit_to_filter_form = null);
            !!this.floatFromFilterValue
                ? (arrayItem.float_from_filter_form = Number(this.floatFromFilterValue))
                : (arrayItem.float_from_filter_form = null);
            !!this.floatToFilterValue
                ? (arrayItem.float_to_filter_form = Number(this.floatToFilterValue))
                : (arrayItem.float_to_filter_form = null);
            !!this.daysLeftFromFilterValue
                ? (arrayItem.days_left_from_filter_form = Number(this.daysLeftFromFilterValue))
                : (arrayItem.days_left_from_filter_form = null);
            !!this.daysLeftToFilterValue
                ? (arrayItem.days_left_to_filter_form = Number(this.daysLeftToFilterValue))
                : (arrayItem.days_left_to_filter_form = null);

            let resultEmptyFilterFields = await this.checkEmptyFields();
            if (resultEmptyFilterFields) {
              await commitAddNotification(this.$store, {
                content: this.$t('alert_filter_required_fields'),
                color: 'red',
              });
              return;
            }
            await this.updateFilterHandler(arrayItem.id, arrayItem);
          }
        }
        this.dialogFilter = false;
        await setTimeout(() => {
          this.filterAddStatus = true;
        }, 150);
        await this.clearDataFilter();
      },
      async dialogChipFilterEdit(item) {
        this.filterId = item.id;
        this.filterTitle = item.filter_title_form;
        this.nameChips = [].concat(item.name_chips_form);
        this.skinWear = [].concat(item.skin_wear);
        this.stickersChips = [].concat(item.stickers_chips_form);
        this.countSalesValue = item.count_sales_form;
        this.priceFromFilterValue = item.price_from_filter_form;
        this.priceToFilterValue = item.price_to_filter_form;
        this.priceHumanMinimumFromFilterValue =
          item.price_human_minimum_from_filter_form;
        this.priceHumanMinimumToFilterValue =
          item.price_human_minimum_to_filter_form;
        this.profitFromFilterValue = item.profit_from_filter_form;
        this.profitToFilterValue = item.profit_to_filter_form;
        this.floatFromFilterValue = item.float_from_filter_form;
        this.floatToFilterValue = item.float_to_filter_form;
        this.daysLeftFromFilterValue = item.days_left_from_filter_form;
        this.daysLeftToFilterValue = item.days_left_to_filter_form;

        this.dialogFilter = true;
        this.filterAddStatus = false;
      },
      async dialogFilterClose() {
        this.dialogFilter = false;
        await this.clearDataFilter();
        await setTimeout(() => {
          this.filterAddStatus = true;
        }, 150);
      },
      async clearDataFilter() {
        this.filterTitle = null;
        this.nameChips = [];
        this.skinWear = [0, 1, 2, 3, 4];
        this.stickersChips = [];
        this.countSalesValue = null;
        this.priceFromFilterValue = null;
        this.priceToFilterValue = null;
        this.priceHumanMinimumFromFilterValue = null;
        this.priceHumanMinimumToFilterValue = null;
        this.profitFromFilterValue = null;
        this.profitToFilterValue = null;
        this.floatFromFilterValue = null;
        this.floatToFilterValue = null;
        this.daysLeftFromFilterValue = null;
        this.daysLeftToFilterValue = null;
      },
      checkEmptyFields() {
        return !this.nameChips.length &&
          !this.skinWear.length &&
          !this.stickersChips.length &&
          !this.countSalesValue &&
          !this.priceFromFilterValue &&
          !this.priceToFilterValue &&
          !this.priceHumanMinimumFromFilterValue &&
          !this.priceHumanMinimumToFilterValue &&
          !this.profitFromFilterValue &&
          !this.profitToFilterValue &&
          !this.floatFromFilterValue &&
          !this.floatToFilterValue &&
          !this.daysLeftFromFilterValue &&
          !this.daysLeftToFilterValue;
      },
    },
  };
</script>

<style scoped></style>
