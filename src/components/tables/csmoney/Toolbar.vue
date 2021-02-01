<template>
  <div>
    <v-toolbar class="px-0" light>
      <v-toolbar-title>
        {{ $t('CSMoney_Table') }}
        <v-tooltip v-if="liveStatus" color="indigo darken-4" right>
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              v-on="on"
              class="mb-1 px-2"
              small
              color="success"
              outlined
            >
              <i class="recordLed live"></i>
              <pre style="font-family: 'Arial', sans-serif;"> LIVE</pre>
            </v-chip>
          </template>
          <span v-if="!lastTimeGetItem">
            {{ $t('is_absent_last_time_get_item') }}
          </span>
          <span v-else>
            {{ $t('time_to_recieve_the_last_item') }} {{ lastTimeGetItem }}
          </span>
        </v-tooltip>
      </v-toolbar-title>
      <v-tooltip v-if="liveStatus" color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="indigo darken-4"
            @click="liveOff()"
          >
            <v-icon>pause_circle_outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('live_off') }}</span>
      </v-tooltip>
      <v-tooltip v-else color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="indigo darken-4"
            @click="liveOn()"
          >
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('live_on') }}</span>
      </v-tooltip>
      <v-tooltip color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="indigo darken-4"
            @click="tableDataRenew()"
          >
            <v-icon>autorenew</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('span_refresh_data_table') }}</span>
      </v-tooltip>
      <v-tooltip v-if="soundNotification == true" color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="indigo darken-4"
            @click="soundNotificationTurnOff()"
          >
            <v-icon>volume_up</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('sound_notification') }}</span>
      </v-tooltip>
      <v-tooltip v-else color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
            color="indigo darken-4"
            @click="soundNotificationTurnOn()"
          >
            <v-icon>volume_off</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('sound_notification') }}</span>
      </v-tooltip>
      <v-tooltip color="indigo darken-4" bottom>
        <template #activator="{ on, attrs }">
          <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              color="indigo darken-4"
              @click="dialogProfitColorPalette = true"
          >
            <v-icon>invert_colors</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('span_profit_сolor_palette') }}</span>
      </v-tooltip>
      <v-dialog
          id="dialogProfitColorPalette"
          v-model="dialogProfitColorPalette"
          max-width="500px"
          style="margin-top: 200px;"
          persistent
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t('span_profit_сolor_palette') }}</span>
            <v-icon color="indigo darken-4">invert_colors</v-icon>
          </v-card-title>
          <v-card-text style="padding-bottom: 0px;">
            <v-divider></v-divider>
            <small>{{ $t('profit_color_requirements') }}</small>
            <br />
            <v-container>
              <v-row>
                <v-text-field
                    outlined
                    dense
                    v-model="profitColorGreen"
                    suffix="%"
                    type="number"
                    :label="$t('profit_green')"
                    :hint="$t('hint_profit_greeen')"
                    @input="$emit('profit-color-green', profitColorGreen)"
                    persistent-hint
                ></v-text-field>
              </v-row>
              <br />
              <v-row>
                <v-text-field
                    outlined
                    dense
                    v-model="profitColorOrange"
                    suffix="%"
                    type="number"
                    :label="$t('profit_orange')"
                    :hint="$t('hint_profit_orange')"
                    @input="$emit('profit-color-orange', profitColorOrange)"
                    persistent-hint
                ></v-text-field>
              </v-row>
            </v-container>
            <small>{{ $t('hint_profit_red') }}</small>
            <br />
            <small>{{ $t('required_fields') }}</small>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="dialogProfitColorPaletteSave()"
            >{{ $t('save') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-spacer></v-spacer>

      <v-divider
          class="mr-4 ml-1"
          inset
          vertical
      ></v-divider>
      <v-menu
        v-model="colMenu"
        :close-on-content-click="false"
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            color=primary
            v-bind="attrs"
            v-on="on"
            class="mr-1 background-img-btn"
          >
            {{$t('col_display')}}
            <v-icon right dark>visibility</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemLinkIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-link-is-show', colItemLinkIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_link') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemPriceIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-price-is-show', colItemPriceIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_price') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemPriceHumanMinimumIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-price-human-minimum-is-show', colItemPriceHumanMinimumIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_human_price_minimum') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemDefaultPriceIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-default-price-is-show', colItemDefaultPriceIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_default_price') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemProfitIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-profit-is-show', colItemProfitIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_profit') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemFloatIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-float-is-show', colItemFloatIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_float') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemDaysLeftIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-days-left-is-show', colItemDaysLeftIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_days_left') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemStatusIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-status-is-show', colItemStatusIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_status') }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-action>
                <v-switch
                  v-model="colItemTimeAddIsShow"
                  color="indigo darken-4"
                  @change="$emit('switch-col-item-time-add-is-show', colItemTimeAddIsShow)"
                ></v-switch>
              </v-list-item-action>
              <v-list-item-title>{{ $t('table_item_time_add') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu
        v-model="tableSettingsMenu"
        :close-on-content-click="false"
        offset-y
        max-height="800"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            dark
            color=primary
            v-bind="attrs"
            v-on="on"
            class="mr-0 background-img-btn"
          >
            {{ $t('other_table_settings') }}
            <v-icon right dark>tune</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="pb-2">
            {{ $t('overstock_and_unavailable') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchStatus"
                    color="indigo darken-4"
                    @change="$emit('switch-status-change', switchStatus)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_overstock_and_unavailable') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            {{ $t('only_items_with_stickers') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                      v-model="switchOnlyItemWithSticker"
                      color="indigo darken-4"
                      @change="$emit('switch-only-item-with-sticker-change', switchOnlyItemWithSticker)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_items_with_stickers') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            StatTrak
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchOnlyStatTrak"
                    color="indigo darken-4"
                    @change="$emit('switch-only-stattrak-change', switchOnlyStatTrak)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_stat_trak') }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchWithoutStatTrak"
                    color="indigo darken-4"
                    @change="$emit('switch-without-stattrak-change', switchWithoutStatTrak)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_stat_trak') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            {{ $t('gloves') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchOnlyGloves"
                    color="indigo darken-4"
                    @change="$emit('switch-only-gloves-change', switchOnlyGloves)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_gloves') }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchWithoutGloves"
                    color="indigo darken-4"
                    @change="$emit('switch-without-gloves-change', switchWithoutGloves)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_gloves') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            {{ $t('knives') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchOnlyKnives"
                    color="indigo darken-4"
                    @change="$emit('switch-only-knives-change', switchOnlyKnives)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_knives') }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchWithoutKnives"
                    color="indigo darken-4"
                    @change="$emit('switch-without-knives-change', switchWithoutKnives)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_knives') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            {{ $t('stickers') }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchOnlyStickers"
                    color="indigo darken-4"
                    @change="$emit('switch-only-stickers-change', switchOnlyStickers)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_stickers') }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchWithoutStickers"
                    color="indigo darken-4"
                    @change="$emit('switch-without-stickers-change', switchWithoutStickers)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_stickers') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title class="pb-2 pt-0">
            Souvenirs
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-list class="py-0">
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchOnlySouvenirs"
                    color="indigo darken-4"
                    @change="$emit('switch-only-souvenirs-change', switchOnlySouvenirs)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('only_souvenirs') }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="switchWithoutSouvenirs"
                    color="indigo darken-4"
                    @change="$emit('switch-without-souvenirs-change', switchWithoutSouvenirs)"
                  ></v-switch>
                </v-list-item-action>
                <v-list-item-title>{{ $t('without_souvenirs') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-menu>
    </v-toolbar>
  </div>
</template>

<script>
import { commitAddNotification } from '@/store/main/mutations';

export default {
  data () {
    return {
      liveStatus: true,
      // autoWithdrawel: false,

      soundNotification: true,

      // Profit color palette
      dialogProfitColorPalette: false,
      profitColorGreen: 10,
      profitColorOrange: 5,

      // Display table column
      colMenu: false,
      classHiddenElem: 'd-none',

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

      // Other table settings
      tableSettingsMenu: false,

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
    }
  },
  props: {
    lastTimeGetItem: { type: String },
  },
  mounted() {
    // Column visibility
    if (localStorage.colItemLinkIsShow) {
      this.colItemLinkIsShow =
        localStorage.colItemLinkIsShow === 'true' ? true : false;
      this.$emit('col-item-link-is-show', this.colItemLinkIsShow);
    }
    if (localStorage.colItemPriceIsShow) {
      this.colItemPriceIsShow =
        localStorage.colItemPriceIsShow === 'true' ? true : false;
      this.$emit('col-item-price-is-show', this.colItemPriceIsShow);
    }
    if (localStorage.colItemPriceHumanMinimumIsShow) {
      this.colItemPriceHumanMinimumIsShow =
        localStorage.colItemPriceHumanMinimumIsShow === 'true' ? true : false;
      this.$emit('col-item-price-human-minimum-is-show', this.colItemPriceHumanMinimumIsShow);
    }
    if (localStorage.colItemDefaultPriceIsShow) {
      this.colItemDefaultPriceIsShow =
        localStorage.colItemDefaultPriceIsShow === 'true' ? true : false;
      this.$emit('col-item-default-price-is-show', this.colItemDefaultPriceIsShow);
    }
    if (localStorage.colItemProfitIsShow) {
      this.colItemProfitIsShow =
        localStorage.colItemProfitIsShow === 'true' ? true : false;
      this.$emit('col-item-profit-is-show', this.colItemProfitIsShow);
    }
    if (localStorage.colItemFloatIsShow) {
      this.colItemFloatIsShow =
        localStorage.colItemFloatIsShow === 'true' ? true : false;
      this.$emit('col-item-float-is-show', this.colItemFloatIsShow);
    }
    if (localStorage.colItemDaysLeftIsShow) {
      this.colItemDaysLeftIsShow =
        localStorage.colItemDaysLeftIsShow === 'true' ? true : false;
      this.$emit('col-item-days-left-is-show', this.colItemDaysLeftIsShow);
    }
    if (localStorage.colItemStatusIsShow) {
      this.colItemStatusIsShow =
        localStorage.colItemStatusIsShow === 'true' ? true : false;
      this.$emit('col-item-status-is-show', this.colItemStatusIsShow);
    }
    if (localStorage.colItemTimeAddIsShow) {
      this.colItemTimeAddIsShow =
        localStorage.colItemTimeAddIsShow === 'true' ? true : false;
      this.$emit('col-item-time-add-is-show', this.colItemTimeAddIsShow);
    }
    // End logic "Column visibility"

    // Other table settings
    if (localStorage.switchStatus) {
      this.switchStatus = localStorage.switchStatus === 'true' ? true : false;
      this.$emit('switch-status', this.switchStatus);
    }
    if (localStorage.switchOnlyItemWithSticker) {
      this.switchOnlyItemWithSticker = localStorage.switchOnlyItemWithSticker === 'true' ? true : false;
      this.$emit('switch-only-item-with-sticker', this.switchOnlyItemWithSticker);
    }
    if (localStorage.switchOnlyGloves) {
      this.switchOnlyGloves = localStorage.switchOnlyGloves === 'true' ? true : false;
      this.$emit('switch-only-gloves', this.switchOnlyGloves);
    }
    if (localStorage.switchWithoutGloves) {
      this.switchWithoutGloves = localStorage.switchWithoutGloves === 'true' ? true : false;
      this.$emit('switch-without-gloves', this.switchWithoutGloves);
    }
    if (localStorage.switchOnlyKnives) {
      this.switchOnlyKnives = localStorage.switchOnlyKnives === 'true' ? true : false;
      this.$emit('switch-only-knives', this.switchOnlyKnives);
    }
    if (localStorage.switchWithoutKnives) {
      this.switchWithoutKnives = localStorage.switchWithoutKnives === 'true' ? true : false;
      this.$emit('switch-without-knives', this.switchWithoutKnives);
    }
    if (localStorage.switchOnlyStickers) {
      this.switchOnlyStickers = localStorage.switchOnlyStickers === 'true' ? true : false;
      this.$emit('switch-only-stickers', this.switchOnlyStickers);
    }
    if (localStorage.switchWithoutStickers) {
      this.switchWithoutStickers = localStorage.switchWithoutStickers === 'true' ? true : false;
      this.$emit('switch-without-stickers', this.switchWithoutStickers);
    }
    if (localStorage.switchOnlyStatTrak) {
      this.switchOnlyStatTrak = localStorage.switchOnlyStatTrak === 'true' ? true : false;
      this.$emit('switch-only-stattrak', this.switchOnlyStatTrak);
    }
    if (localStorage.switchWithoutStatTrak) {
      this.switchWithoutStatTrak = localStorage.switchWithoutStatTrak === 'true' ? true : false;
      this.$emit('switch-without-stattrak', this.switchWithoutStatTrak);
    }
    if (localStorage.switchOnlySouvenirs) {
      this.switchOnlySouvenirs = localStorage.switchOnlySouvenirs === 'true' ? true : false;
      this.$emit('switch-only-souvenirs', this.switchOnlySouvenirs);
    }
    if (localStorage.switchWithoutSouvenirs) {
      this.switchWithoutSouvenirs = localStorage.switchWithoutSouvenirs === 'true' ? true : false;
      this.$emit('switch-without-souvenirs', this.switchWithoutSouvenirs);
    }
    ////////////////////////

    if (localStorage.soundNotification) {
      this.soundNotification =
        localStorage.soundNotification === 'true' ? true : false;
      this.$emit('sound-notification', this.soundNotification);
    }

    if (localStorage.profitColorGreen) {
      this.profitColorGreen = localStorage.profitColorGreen;
    }
    if (localStorage.profitColorOrange) {
      this.profitColorOrange = localStorage.profitColorOrange;
    }
  },
  watch: {
// Column visibility
    colItemLinkIsShow (newColItemLinkIsShow) {
      localStorage.colItemLinkIsShow = newColItemLinkIsShow;

      if (this.colItemLinkIsShow) this.colHeaderLinkIsShow = '';
      else this.colHeaderLinkIsShow = this.classHiddenElem;

      this.$emit('col-header-link-is-show', this.colHeaderLinkIsShow);
    },
    colItemPriceIsShow (newColItemPriceIsShow) {
      localStorage.colItemPriceIsShow = newColItemPriceIsShow;

      if (this.colItemPriceIsShow) this.colHeaderPriceIsShow = '';
      else this.colHeaderPriceIsShow = this.classHiddenElem;

      this.$emit('col-header-price-is-show', this.colHeaderPriceIsShow);
    },
    colItemPriceHumanMinimumIsShow (newColItemPriceHumanMinimumIsShow) {
      localStorage.colItemPriceHumanMinimumIsShow = newColItemPriceHumanMinimumIsShow;

      if (this.colItemPriceHumanMinimumIsShow) this.colHeaderPriceHumanMinimumIsShow = '';
      else this.colHeaderPriceHumanMinimumIsShow = this.classHiddenElem;

      this.$emit('col-header-price-human-minimum-is-show', this.colHeaderPriceHumanMinimumIsShow);
    },
    colItemDefaultPriceIsShow(newColItemDefaultPriceIsShow) {
      localStorage.colItemDefaultPriceIsShow = newColItemDefaultPriceIsShow;

      if (this.colItemDefaultPriceIsShow) this.colHeaderDefaultPriceIsShow = '';
      else this.colHeaderDefaultPriceIsShow = this.classHiddenElem;

      this.$emit('col-header-default-price-is-show', this.colHeaderDefaultPriceIsShow);
    },
    colItemProfitIsShow (newColItemProfitIsShow) {
      localStorage.colItemProfitIsShow = newColItemProfitIsShow;

      if (this.colItemProfitIsShow) this.colHeaderProfitIsShow = '';
      else this.colHeaderProfitIsShow = this.classHiddenElem;

      this.$emit('col-header-profit-is-show', this.colHeaderProfitIsShow);
    },
    colItemFloatIsShow (newColItemFloatIsShow) {
      localStorage.colItemFloatIsShow = newColItemFloatIsShow;

      if (this.colItemFloatIsShow) this.colHeaderFloatIsShow = '';
      else this.colHeaderFloatIsShow = this.classHiddenElem;

      this.$emit('col-header-float-is-show', this.colHeaderFloatIsShow);
    },
    colItemDaysLeftIsShow (newColItemDaysLeftIsShow) {
      localStorage.colItemDaysLeftIsShow = newColItemDaysLeftIsShow;

      if (this.colItemDaysLeftIsShow) this.colHeaderDaysLeftIsShow = '';
      else this.colHeaderDaysLeftIsShow = this.classHiddenElem;

      this.$emit('col-header-days-left-is-show', this.colHeaderDaysLeftIsShow);
    },
    colItemStatusIsShow (newColItemStatusIsShow) {
      localStorage.colItemStatusIsShow = newColItemStatusIsShow;

      if (this.colItemStatusIsShow) this.colHeaderStatusIsShow = '';
      else this.colHeaderStatusIsShow = this.classHiddenElem;

      this.$emit('col-header-status-is-show', this.colHeaderStatusIsShow);
    },
    colItemTimeAddIsShow (newColItemTimeAddIsShow) {
      localStorage.colItemTimeAddIsShow = newColItemTimeAddIsShow;

      if (this.colItemTimeAddIsShow) this.colHeaderTimeAddIsShow = '';
      else this.colHeaderTimeAddIsShow = this.classHiddenElem;

      this.$emit('col-header-time-add-is-show', this.colHeaderTimeAddIsShow);
    },
    // End logic "Column visibility"

    // Others table settings
    switchStatus(newSwitchStatus) {
      localStorage.switchStatus = newSwitchStatus;
    },
    switchOnlyItemWithSticker(newSwitchOnlyItemWithSticker) {
      localStorage.switchOnlyItemWithSticker = newSwitchOnlyItemWithSticker;
    },
    switchOnlyGloves(newSwitchOnlyGloves) {
      localStorage.switchOnlyGloves = newSwitchOnlyGloves;
    },
    switchWithoutGloves(newSwitchWithoutGloves) {
      localStorage.switchWithoutGloves = newSwitchWithoutGloves;
    },
    switchOnlyKnives(newSwitchOnlyKnives) {
      localStorage.switchOnlyKnives = newSwitchOnlyKnives;
    },
    switchWithoutKnives(newSwitchWithoutKnives) {
      localStorage.switchWithoutKnives = newSwitchWithoutKnives;
    },
    switchOnlyStickers(newSwitchOnlyStickers) {
      localStorage.switchOnlyStickers = newSwitchOnlyStickers;
    },
    switchWithoutStickers(newSwitchWithoutStickers) {
      localStorage.switchWithoutStickers = newSwitchWithoutStickers;
    },
    switchOnlyStatTrak(newSwitchOnlyStatTrak) {
      localStorage.switchOnlyStatTrak = newSwitchOnlyStatTrak;
    },
    switchWithoutStatTrak(newSwitchWithoutStatTrak) {
      localStorage.switchWithoutStatTrak = newSwitchWithoutStatTrak;
    },
    switchOnlySouvenirs(newSwitchOnlySouvenirs) {
      localStorage.switchOnlySouvenirs = newSwitchOnlySouvenirs;
    },
    switchWithoutSouvenirs(newSwitchWithoutSouvenirs) {
      localStorage.switchWithoutSouvenirs = newSwitchWithoutSouvenirs;
    },
    ///////////////////////

    soundNotification(newSoundNotification) {
      localStorage.soundNotification = newSoundNotification;
    },
    profitColorGreen(newProfitColorGreen) {
      localStorage.profitColorGreen = newProfitColorGreen;
    },
    profitColorOrange(newProfitColorOrange) {
      localStorage.profitColorOrange = newProfitColorOrange;
    },
  },
  methods: {
    async tableDataRenew() {
      this.$emit('table-data-renew', []);
      commitAddNotification(this.$store, {
        content: this.$t('alert_update_data_table'),
        color: 'success',
      });
    },
    // Profit color palette
    dialogProfitColorPaletteSave() {
      if (!this.profitColorGreen || !this.profitColorOrange) {
        commitAddNotification(this.$store, {
          content: this.$t('alert_filter_required_fields'),
          color: 'red',
        });
        return;
      }
      if (Number(this.profitColorOrange) >= Number(this.profitColorGreen)) {
        commitAddNotification(this.$store, {
          content: this.$t('alert_profit_balance_color_palette'),
          color: 'red',
        });
        return;
      }
      this.dialogProfitColorPalette = false;
    },
    soundNotificationTurnOn() {
      this.$emit('sound-notification-turn-on', true);
      this.soundNotification = true;
      commitAddNotification(this.$store, {
        content: this.$t('alert_sound_notification_turn_on'),
        color: 'success',
      });
    },
    soundNotificationTurnOff() {
      this.$emit('sound-notification-turn-off', false);
      this.soundNotification = false;
      commitAddNotification(this.$store, {
        content: this.$t('alert_sound_notification_turn_off'),
        color: 'success',
      });
    },
    async liveOn() {
      this.liveStatus = true;
      this.$emit('ws-open');
      commitAddNotification(this.$store, {
        content: this.$t('alert_live_on'),
        color: 'success',
      });
    },
    async liveOff() {
      this.liveStatus = false;
      this.$emit('ws-close');
      commitAddNotification(this.$store, {
        content: this.$t('alert_live_off'),
        color: 'success',
      });
    }
  }
}
</script>

<style scoped >
  /*Live loader*/
  .recordLed {
    padding-right: 5px;
    width: 15px;
    height: 15px;
    background-color: lawngreen;
    border-radius: 50%;
  }
  .live {
    animation: blinking 1s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
  }
  @keyframes blinking {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>