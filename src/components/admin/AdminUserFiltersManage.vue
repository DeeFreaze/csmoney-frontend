<template>
  <div>
    <v-container fluid>
      <v-data-table class="elevation-1" :headers="headers" :items="filtersArr">
        <template #item="{ item }">
          <tr>
            <td>{{ item.is_active }}</td>
            <td>{{ item.filter_title_form }}</td>
            <td>{{ item.name_chips_form }}</td>
            <td>{{ item.skin_wear }}</td>
            <td>{{ item.stickers_chips_form }}</td>
            <td>{{ item.count_sales_form }}</td>
            <td>{{ item.price_from_filter_form }}</td>
            <td>{{ item.price_to_filter_form }}</td>
            <td>{{ item.price_human_minimum_from_filter_form }}</td>
            <td>{{ item.price_human_minimum_to_filter_form }}</td>
            <td>{{ item.profit_from_filter_form }}</td>
            <td>{{ item.profit_to_filter_form }}</td>
            <td>{{ item.float_from_filter_form }}</td>
            <td>{{ item.float_to_filter_form }}</td>
            <td>{{ item.days_left_from_filter_form }}</td>
            <td>{{ item.days_left_to_filter_form }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    filtersArr: { type: Array }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Is Active',
          sortable: false,
          value: 'isActive',
          align: 'left',
        },
        {
          text: 'Filter title',
          sortable: false,
          value: 'filterTitle',
          align: 'left',
        },
        {
          text: 'Items name',
          sortable: false,
          value: 'itemsName',
          align: 'left',
        },
        {
          text: 'Skins wear',
          sortable: false,
          value: 'skinWear',
          align: 'left',
        },
        {
          text: 'Stickers name',
          sortable: false,
          value: 'stickersName',
          align: 'left',
        },
        {
          text: 'Count sales',
          sortable: false,
          value: 'countSales',
          align: 'left',
        },
        {
          text: 'Price from',
          sortable: false,
          value: 'price_from_filter_form',
          align: 'left',
        },
        {
          text: 'Price to',
          sortable: false,
          value: 'price_to_filter_form',
          align: 'left',
        },
        {
          text: 'Price human from',
          sortable: false,
          value: 'price_human_minimum_from_filter_form',
          align: 'left',
        },
        {
          text: 'Price human to',
          sortable: false,
          value: 'price_human_minimum_to_filter_form',
          align: 'left',
        },
        {
          text: 'Profit from',
          sortable: false,
          value: 'profit_from_filter_form',
          align: 'left',
        },
        {
          text: 'Profit to',
          sortable: false,
          value: 'profit_to_filter_form',
          align: 'left',
        },
        {
          text: 'Float from',
          sortable: false,
          value: 'float_from_filter_form',
          align: 'left',
        },
        {
          text: 'Float to',
          sortable: false,
          value: 'float_to_filter_form',
          align: 'left',
        },
        {
          text: 'Days left from',
          sortable: false,
          value: 'days_left_from_filter_form',
          align: 'left',
        },
        {
          text: 'Days left to',
          sortable: false,
          value: 'days_left_to_filter_form',
          align: 'left',
        },
      ]
    }
  },
}
</script>
