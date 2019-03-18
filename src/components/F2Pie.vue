<template>
  <!--<div :id="id"></div>-->
  <div class="chart-wrapper">
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
import F2 from "@antv/f2";
export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    charData: {
      type: Array,
      default: function() {
        return {
          data: []
        };
      }
    },
    id: String
  },
  mounted() {
    //this.drawChart();
  },
  // 监听API接口传过来的数据  2018-08-21更新
  watch: {
    charData: function(val, oldVal) {
      // 监听charData，当放生变化时，触发这个回调函数绘制图表
      this.drawChart(val);
    }
  },
  methods: {
    drawChart: function(datas) {
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的F2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      let data = datas;
      var colorMap = {};
      colorMap[data[0].assetType] = '#44A1FF';
      colorMap[data[1].assetType] = '#4CCBCB';
      colorMap[data[2].assetType] = '#48CB74';
      colorMap[data[3].assetType] = '#FAD446';
      colorMap[data[4].assetType] = '#F1627B';
      // 设置图例项的内容
      var legendItems = [];
      data.map(function(obj) {
        var item = {
          name: obj.assetType,
          value: "    " + obj.percent + "%",
          marker: {
            symbol: "circle",
            fill: colorMap[obj.assetType],
            radius: 4
          }
        };
        legendItems.push(item);
      });
      this.chart = new F2.Chart({
        id: this.id,
        pixelRatio: window.devicePixelRatio
      });
      this.chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val + "%";
          }
        }
      });
      this.chart.coord("polar", {
        transposed: true,
        radius: 0.85
      });
      this.chart.tooltip({
        offsetY: 20
      });
      this.chart.legend({
        position: "right",
        custom: true,
        items: legendItems,
        nameStyle: {
          fill: "#808080",
          fontSize: "15"
        }, // 图例项 key 值文本样式
        valueStyle: {
          fill: "#333",
          fontWeight: "bold", // 图例项 value 值文本样式
          fontSize: "15"
        }
      });
      this.chart.axis(false);
      this.chart
        .interval()
        .position("const*percent")
        .color("assetType", function(val) {
          return colorMap[val];
        })
        .adjust("stack")
        .style({
          lineWidth: 1
        });
      this.chart.render();
    }
  }
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  width: 100vw;
  height: 69.33333333vw;
}
@media all and (orientation: landscape) {
  canvas {
    display: block;
    width: 100vw;
    height: 48.12593703vw;
  }
}
</style>
