<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning' | localize}}</h3>
      <h4>{{info.bill | currency('RUB')}}</h4>
    </div>

    <Loader
      v-if="loading"
    /> 

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{'Category_notExist' | localize}}
      <router-link
        to="/categories"
      >
        {{'AddNewCategory' | localize}}
      </router-link>
    </p> 

    <section v-else>
      <div 
        v-for="cat of categories" 
        :key="cat.id"
      >
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} {{'Of'|localize}} {{cat.limit | currency}}
        </p>
        <div class="progress" 
          v-tooltip.noloc="cat.tooltip"
        >
          <div
            class="determinate"
            :style="{width: cat.progressPercent + '%'}"
            :class="[cat.progressColor]"
          ></div>
        </div>
      </div>
    </section> 
</div>
</template>

<script>
import {mapGetters} from 'vuex' 
import currencyFilter from '@/filters/currency.filter.js'
import localizeFilter from '@/filters/localize.filters.js' 

export default {
  metaInfo() {
    return {
      title: this.$title('Planning')
    }
  },
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categs = await this.$store.dispatch('fetchCategories')

    this.categories = categs.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id )
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)
    
        
      console.log(spend + ' spend')

      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green'
        : percent < 100 
          ? 'yellow'
          : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Remain')
      } ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      }
    })

    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>

<style>

</style>
