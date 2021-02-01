<template>
  <div>
    <tool-bar
        :lastTimeGetItem="lastTimeGetItem"
        @ws-open="wsOpen"
        @ws-close="connectionWS.close()"

        @table-data-renew="csmoneyItemsFiltered = $event"

        @sound-notification="soundNotification = $event"
        @sound-notification-turn-on="soundNotification = $event"
        @sound-notification-turn-off="soundNotification = $event"


        @profit-color-green="profitColorGreen = $event"
        @profit-color-orange="profitColorOrange = $event"

        @switch-col-item-link-is-show="colItemLinkIsShow = $event"
        @col-header-link-is-show="colHeaderLinkIsShow = $event"
        @col-item-link-is-show="colItemLinkIsShow = $event"

        @switch-col-item-price-is-show="colItemPriceIsShow = $event"
        @col-header-price-is-show="colHeaderPriceIsShow = $event"
        @col-item-price-is-show="colItemPriceIsShow = $event"

        @switch-col-item-price-human-minimum-is-show="colItemPriceHumanMinimumIsShow = $event"
        @col-header-price-human-minimum-is-show="colHeaderPriceHumanMinimumIsShow = $event"
        @col-item-price-human-minimum-is-show="colItemPriceHumanMinimumIsShow = $event"

        @switch-col-item-default-price-is-show="colItemDefaultPriceIsShow = $event"
        @col-header-default-price-is-show="colHeaderDefaultPriceIsShow = $event"
        @col-item-default-price-is-show="colItemDefaultPriceIsShow = $event"

        @switch-col-item-profit-is-show="colItemProfitIsShow = $event"
        @col-header-profit-is-show="colHeaderProfitIsShow = $event"
        @col-item-profit-is-show="colItemProfitIsShow = $event"

        @switch-col-item-float-is-show="colItemFloatIsShow = $event"
        @col-header-float-is-show="colHeaderFloatIsShow = $event"
        @col-item-float-is-show="colItemFloatIsShow = $event"

        @switch-col-item-days-left-is-show="colItemDaysLeftIsShow = $event"
        @col-header-days-left-is-show="colHeaderDaysLeftIsShow = $event"
        @col-item-days-left-is-show="colItemDaysLeftIsShow = $event"

        @switch-col-item-status-is-show="colItemStatusIsShow = $event"
        @col-header-status-is-show="colHeaderStatusIsShow = $event"
        @col-item-status-is-show="colItemStatusIsShow = $event"

        @switch-col-item-time-add-is-show="colItemTimeAddIsShow = $event"
        @col-header-time-add-is-show="colHeaderTimeAddIsShow = $event"
        @col-item-time-add-is-show="colItemTimeAddIsShow = $event"

        @switch-status="switchStatus = $event"
        @switch-status-change="switchStatus = $event"

        @switch-only-item-with-sticker="switchOnlyItemWithSticker = $event"
        @switch-only-item-with-sticker-change="switchOnlyItemWithSticker = $event"

        @switch-only-gloves="switchOnlyGloves = $event"
        @switch-only-gloves-change="switchOnlyGloves = $event"

        @switch-without-gloves="switchWithoutGloves = $event"
        @switch-without-gloves-change="switchWithoutGloves = $event"

        @switch-only-knives="switchOnlyKnives = $event"
        @switch-only-knives-change="switchOnlyKnives = $event"

        @switch-without-knives="switchWithoutKnives = $event"
        @switch-without-knives-change="switchWithoutKnives = $event"

        @switch-only-stickers="switchOnlyStickers = $event"
        @switch-only-stickers-change="switchOnlyStickers = $event"

        @switch-without-stickers="switchWithoutStickers = $event"
        @switch-without-stickers-change="switchWithoutStickers = $event"

        @switch-only-stattrak="switchOnlyStatTrak = $event"
        @switch-only-stattrak-change="switchOnlyStatTrak = $event"

        @switch-without-stattrak="switchWithoutStatTrak = $event"
        @switch-without-stattrak-change="switchWithoutStatTrak = $event"

        @switch-only-souvenirs="switchOnlySouvenirs = $event"
        @switch-only-souvenirs-change="switchOnlySouvenirs = $event"

        @switch-without-souvenirs="switchWithoutSouvenirs = $event"
        @switch-without-souvenirs-change="switchWithoutSouvenirs = $event"
    />
    <v-divider></v-divider>
    <filters-management
        @filters-arr="filtersArr = $event"
    />
    <v-divider></v-divider>
    <table-view
        :headers="headers"
        :footerProps="footerProps"
        :csmoneyItemsFiltered="csmoneyItemsFiltered"
        :profitColorGreen="profitColorGreen"
        :profitColorOrange="profitColorOrange"
        :colItemLinkIsShow="colItemLinkIsShow"
        :colItemPriceIsShow="colItemPriceIsShow"
        :colItemPriceHumanMinimumIsShow="colItemPriceHumanMinimumIsShow"
        :colItemDefaultPriceIsShow="colItemDefaultPriceIsShow"
        :colItemProfitIsShow="colItemProfitIsShow"
        :colItemFloatIsShow="colItemFloatIsShow"
        :colItemDaysLeftIsShow="colItemDaysLeftIsShow"
        :colItemStatusIsShow="colItemStatusIsShow"
        :colItemTimeAddIsShow="colItemTimeAddIsShow"
    />
    <v-divider></v-divider>
  </div>
</template>

<script>
import {wsURL} from '../../../../env';

import Toolbar from "@/components/tables/csmoney/Toolbar";
import FiltersManagement from "@/components/tables/csmoney/FiltersManagement";
import TableView from "@/components/tables/csmoney/TableView";

export default {
  components: {
    'tool-bar': Toolbar,
    'filters-management': FiltersManagement,
    'table-view': TableView
  },
  data() {
    return {
      soundNotification: true,

      // WebSocket system
      connectionWS: null,

      // Other table settings
      lastTimeGetItem: null,
      audio: new Audio(require('@/assets/message.mp3')),

      switchStatus: false,
      switchOnlyItemWithSticker: false,
      switchOnlyGloves: false,
      switchWithoutGloves: false,
      switchOnlyKnives: false,
      switchWithoutKnives: false,
      switchOnlyStickers: false,
      switchWithoutStickers: false,
      switchOnlyStatTrak: false,
      switchWithoutStatTrak: false,
      switchOnlySouvenirs: false,
      switchWithoutSouvenirs: false,

      // Display table column

      colHeaderLinkIsShow: '',
      colHeaderPriceIsShow: '',
      colHeaderPriceHumanMinimumIsShow: '',
      colHeaderDefaultPriceIsShow: '',
      colHeaderProfitIsShow: '',
      colHeaderFloatIsShow: '',
      colHeaderDaysLeftIsShow: '',
      colHeaderStatusIsShow: '',
      colHeaderTimeAddIsShow: '',

      colItemLinkIsShow: true,
      colItemPriceIsShow: true,
      colItemPriceHumanMinimumIsShow: true,
      colItemDefaultPriceIsShow: true,
      colItemProfitIsShow: true,
      colItemFloatIsShow: true,
      colItemDaysLeftIsShow: true,
      colItemStatusIsShow: true,
      colItemTimeAddIsShow: true,
      // End

      // Profit color palette
      profitColorGreen: '',
      profitColorOrange: '',

      // Filter fields
      filtersArr: [],

      csmoneyItemsFiltered: [],

      // Body options
      footerProps: {
        page: 1,
        'items-per-page-options': [15, 30, 50, 100],
      },
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('table_item_name'),
          sortable: false,
          value: 'name',
          align: 'left',
          class: 'pr-0 pl-1'
        },
        {
          text: this.$t('table_item_link'),
          sortable: false,
          value: 'link',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderLinkIsShow}`
        },
        {
          text: this.$t('table_item_price'),
          sortable: true,
          value: 'price',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderPriceIsShow}`
        },
        {
          text: this.$t('table_item_human_price_minimum'),
          sortable: true,
          value: 'priceHumanMinimum',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderPriceHumanMinimumIsShow}`
        },
        {
          text: this.$t('table_item_default_price'),
          sortable: true,
          value: 'defaultPrice',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderDefaultPriceIsShow}`
        },
        {
          text: this.$t('table_item_profit'),
          sortable: true,
          value: 'profit',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderProfitIsShow}`
        },
        {
          text: this.$t('table_item_float'),
          sortable: true,
          value: 'float',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderFloatIsShow}`
        },
        {
          text: this.$t('table_item_days_left'),
          sortable: true,
          value: 'tradeunlock',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderDaysLeftIsShow}`
        },
        {
          text: this.$t('table_item_status'),
          sortable: true,
          value: 'status',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderStatusIsShow}`
        },
        {
          text: this.$t('table_item_time_add'),
          sortable: true,
          value: 'timeAdd',
          align: 'left',
          class: `pr-0 pl-1 ${this.colHeaderTimeAddIsShow}`
        },
      ];
    },
  },
  beforeMount() {
    this.wsOpen();
  },
  watch: {
    csmoneyItemsFiltered() {
      if (this.csmoneyItemsFiltered.length >= 1000) {
        for (let i = this.csmoneyItemsFiltered.length - 1; i >= 1000; i--) {
          this.csmoneyItemsFiltered.splice(i, 1);
        }
      }
    },
  },
  methods: {
    wsOpen() {
      this.connectionWS = new WebSocket(`${wsURL}/api/items/ws`);

      this.connectionWS.onopen = function () {
        console.log('[open] Connection established');
      };

      this.connectionWS.onclose = function (event) {
        if (event.wasClean) {
          console.log(
              `[close] Connection closed cleanly, code=${event.code}`
          );
        } else {
          console.log('[close] Connection died');
        }
      };

      this.connectionWS.onmessage = async (event) => {
        console.log('[message] Data received from server');
        let incomingMessage = event.data;
        await this.wsMessageHandler(incomingMessage);
      };

      this.connectionWS.onerror = function (error) {
        console.log(`[error] ${error.message}`);
      };
    },

    // WebSocket handler
    wsMessageHandler: async function (incomingMessage) {
      const itemsFromBackend = JSON.parse(incomingMessage);

      for (let itemFromBackend of itemsFromBackend) {
        const item = {
          id: Date.now(),
          name: itemFromBackend.item_name,
          link: itemFromBackend.item_link,
          stickers: itemFromBackend.stickers,
          salesData: itemFromBackend.sales_data,
          salesAmount: itemFromBackend.item_sales_amount,
          price: itemFromBackend.item_price,
          overPriceFloat: itemFromBackend.item_over_price_float,
          overPricePattern: itemFromBackend.item_over_price_pattern,
          overPriceSticker: itemFromBackend.item_over_price_sticker,
          priceHumanMinimum: itemFromBackend.item_human_price || this.$t('is_empty'),
          defaultPrice: itemFromBackend.item_default_price || this.$t('is_empty'),
          profit: itemFromBackend.item_profit,
          float: itemFromBackend.item_float,
          tradeunlock: itemFromBackend.item_trade_unlock,
          status: itemFromBackend.item_status || this.$t('is_empty'),
          isNew: true,
          copySucceeded: false,
          isSelected: false,
          time_add: new Date().toLocaleTimeString(),
        };
        this.itemFiltration(item);

        this.lastTimeGetItem = new Date().toLocaleString();
      }
    },
    async addItemToTable(item) {
      let result = await this.filterItemWithOtherFilters(item);
      if (result === true) {
        this.soundNotificationFunc();
        this.csmoneyItemsFiltered.unshift(item);
      }
    },

    async getActiveFilters() {
      let activeFiltersList = [];
      for (let filter of this.filtersArr) {
        if (filter.is_active) {
          activeFiltersList.push(filter);
        }
      }
      return activeFiltersList;
    },

    // Фильтрация залетевших айтемов
    async itemFiltration(item) {
      let activeFilters = await this.getActiveFilters();
      if (!activeFilters.length) {
        try {
          await this.addItemToTable(item);
        } catch (e) {
          console.log(e);
        }
      } else {
        for (let filter of activeFilters) {
          try {
            let result = await this.filterOneItem(filter, item);
            if (result === true) {
              await this.addItemToTable(item);
              return true;
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    },

    // Filter one element
    async filterOneItem(filter, item) {
      let result;
      let resultIsWasName;
      let resultIsWasSticker;

      if (filter.is_active === true) {
        item.is_was_name = await this.nameChipsFilter(filter.name_chips_form, item.name);
        if (item.is_was_name) resultIsWasName = true;
        result = await this.skinWearFilter(filter.skin_wear, item.name);
        if (!result) return;
        item.is_was_sticker = await this.stickersChipsFilter(filter.stickers_chips_form, item);
        if (item.is_was_sticker) resultIsWasSticker = true;
        result = await this.countSalesFilter(filter.count_sales_form, item.salesAmount);
        if (!result) return;
        result = await this.priceFromFilter(filter.price_from_filter_form, item.price);
        if (!result) return;
        result = await this.priceToFilter(filter.price_to_filter_form, item.price);
        if (!result) return;
        result = await this.priceHumanMinimumFromFilter(filter.price_human_minimum_from_filter_form, item.priceHumanMinimum);
        if (!result) return;
        result = await this.priceHumanMinimumToFilter(filter.price_human_minimum_to_filter_form, item.priceHumanMinimum);
        if (!result) return;
        result = await this.profitFromFilter(filter.profit_from_filter_form, item.profit);
        if (!result) return;
        result = await this.profitToFilter(filter.profit_to_filter_form, item.profit);
        if (!result) return;
        result = await this.floatFromFilter(filter.float_from_filter_form, item.float);
        if (!result) return;
        result = await this.floatToFilter(filter.float_to_filter_form, item.float);
        if (!result) return;
        result = await this.daysLeftFromFilter(filter.days_left_from_filter_form, item.tradeunlock);
        if (!result) return;
        result = await this.daysLeftToFilter(filter.days_left_to_filter_form, item.tradeunlock);
        if (!result) return;

        if (!resultIsWasName || !resultIsWasSticker) return; // ?????????????????????????????
      }
      return true;
    },

    // Item filtartion with other table filters
    async filterItemWithOtherFilters(item) {
      let isTrue = false;
      let itemStatus;
      let itemType;
      let isItemWithSticker;

      if (
          !this.switchStatus &&
          !this.switchOnlyItemWithSticker &&
          !this.switchOnlyStatTrak &&
          !this.switchWithoutStatTrak &&
          !this.switchOnlyStickers &&
          !this.switchWithoutStickers &&
          !this.switchOnlyGloves &&
          !this.switchWithoutGloves &&
          !this.switchOnlyKnives &&
          !this.switchWithoutKnives &&
          !this.switchOnlySouvenirs &&
          !this.switchWithoutSouvenirs
      ) return true;

      // Other table settings filters
      if (this.switchStatus) {
        itemStatus = await this.statusFilter(item.status);
        if (!itemStatus) return;
        else isTrue = true;
      }
      // Only items with stickers
      if (this.switchOnlyItemWithSticker) {
        isItemWithSticker = await this.stickerIsPresent(item.stickers);
        if (isItemWithSticker) isTrue = true;
      }
      // Only StatTrak
      if (this.switchOnlyStatTrak) {
        itemType = await this.statTrakFilter(item.name);
        if (itemType) isTrue = true;
      }
      // Without StatTrak
      if (this.switchWithoutStatTrak) {
        itemType = await this.statTrakFilter(item.name);
        if (!itemType) isTrue = true;
      }
      // Only stickers
      if (this.switchOnlyStickers) {
        itemType = await this.stickerFilter(item.name);
        if (itemType) isTrue = true;
      }
      // Without stickers
      if (this.switchWithoutStickers) {
        itemType = await this.stickerFilter(item.name);
        if (!itemType) isTrue = true;
      }
      // Only glowes
      if (this.switchOnlyGloves) {
        itemType = await this.glowesOrKnivesFilter(item.name);
        if (itemType === "Gloves") isTrue = true;
      }
      // Without glowes
      if (this.switchWithoutGloves) {
        itemType = await this.glowesOrKnivesFilter(item.name);
        if (itemType !== "Gloves") isTrue = true;
      }
      // Only knives
      if (this.switchOnlyKnives) {
        itemType = await this.glowesOrKnivesFilter(item.name);
        if (itemType === "Knife") isTrue = true;
      }
      // Without knives
      if (this.switchWithoutKnives) {
        itemType = await this.glowesOrKnivesFilter(item.name);
        if (itemType !== "Knife") isTrue = true;
      }
      // Only Souvenirs
      if (this.switchOnlySouvenirs) {
        itemType = await this.souvenirsFilter(item.name);
        if (itemType) isTrue = true;
      }
      // Without Souvenirs
      if (this.switchWithoutSouvenirs) {
        itemType = await this.souvenirsFilter(item.name);
        if (!itemType) isTrue = true;
      }

      return !!isTrue;
    },

    // Filters
    nameChipsFilter(filterValue, itemValue) {
      if (!filterValue.length) return true;
      else {
        for (let itemName of filterValue) {
          let result = itemValue.toLowerCase().includes(itemName.toLowerCase());
          if (result) return true;
        }
        return false;
      }
    },
    skinWearFilter(filterValue, itemValue) {
      if (!filterValue.length) return true;
      else {
        for (let itemInd of filterValue) {
          let factoryNew = 'Factory New';
          let minimalWear = 'Minimal Wear';
          let fieldTested = 'Field-Tested';
          let wellWorn = 'Well-Worn';
          let battleScared = 'Battle-Scarred';

          let result;

          switch (itemInd) {
            case 0:
              result = itemValue.toLowerCase().includes(factoryNew.toLowerCase());
              if (result) return true;
              break;
            case 1:
              result = itemValue.toLowerCase().includes(minimalWear.toLowerCase());
              if (result) return true;
              break;
            case 2:
              result = itemValue.toLowerCase().includes(fieldTested.toLowerCase());
              if (result) return true;
              break;
            case 3:
              result = itemValue.toLowerCase().includes(wellWorn.toLowerCase());
              if (result) return true;
              break;
            case 4:
              result = itemValue.toLowerCase().includes(battleScared.toLowerCase());
              if (result) return true;
              break;
          }
        }
        return false;
      }
    },
    stickersChipsFilter(filterValue, itemValue) {
      if (!filterValue.length) return true;
      if (!itemValue.stickers) return false;

      for (let itemNameSticker of itemValue.stickers) {
        for (let filterNameSticker of filterValue) {
          let result = itemNameSticker.sticker_name.toLowerCase().includes(filterNameSticker.toLowerCase());

          if (result) return true;
        }
      }
      return false;
    },
    countSalesFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    priceFromFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    priceToFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue <= filterValue;
    },
    priceHumanMinimumFromFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    priceHumanMinimumToFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue <= filterValue;
    },
    profitFromFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    profitToFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue <= filterValue;
    },
    floatFromFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    floatToFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue <= filterValue;
    },
    daysLeftFromFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue >= filterValue;
    },
    daysLeftToFilter(filterValue, itemValue) {
      return !filterValue ? true : itemValue <= filterValue;
    },
    statusFilter(itemValue) {
      let available = 'Available';
      return available.toLowerCase() === (itemValue).toLowerCase();
    },
    stickerFilter(itemValue) {
      let sticker = 'Sticker';
      return itemValue.toLowerCase().includes(sticker.toLowerCase());
    },
    stickerIsPresent(itemValue) {
      return (!itemValue) ? false : true;
    },
    statTrakFilter(itemValue) {
      let statTrak = 'StatTrak';
      return itemValue.toLowerCase().includes(statTrak.toLowerCase());
    },
    glowesOrKnivesFilter(itemName) {
      let glowes = "Gloves";
      let wraps = "Wraps";

      if (itemName.includes('★')) {
        if (itemName.toLowerCase().includes(glowes.toLowerCase()) ||
            itemName.toLowerCase().includes(wraps.toLowerCase())) {
          return "Gloves";
        } else {
          return "Knife";
        }
      }
    },
    souvenirsFilter(itemValue) {
      let souvenir = 'Souvenir';
      return itemValue.toLowerCase().includes(souvenir.toLowerCase());
    },
    // Уведомление пользователя о новом скинчике
    async soundNotificationFunc() {
      if (this.soundNotification == true) {
        if (this.audio.duration > 0 && !this.audio.paused) {
          // Its playing...do your job
        } else {
          // Not playing...maybe paused, stopped or never played.
          this.audio.play();
        }
      }
    },
  },
  beforeDestroy() {
    this.connectionWS.close(1000, "The work is done");
  }
};
</script>

<style scoped>

</style>