import { SVG } from '@svgdotjs/svg.js'

export function eye(color) {
  return SVG()
    .path('M54.936,81.343c2.183-4.885,6.588-11.417,12.383-12.106c3.4-0.106,6.305,2.561,8.337,4.939c1.795,2.181,3.236,4.5,4.251,7.115c0.198,0.51-0.055,1.084-0.565,1.282c-0.36,0.14-0.748,0.055-1.019-0.184c-2.044-1.679-3.962-3.449-5.866-5.027c-1.289-1.031-3.589-2.936-4.918-2.962c-0.339-0.014-1.369,0.386-2.289,0.972c-3.143,2.027-5.881,4.618-8.969,6.965C55.625,82.918,54.574,82.131,54.936,81.343L54.936,81.343z')
    .fill(color)
}

export function cheeks(color) {
  return SVG()
    .path('M58.2,93.584c0,3.803-4.991,6.887-11.147,6.887s-11.147-3.083-11.147-6.887c0-3.803,4.991-6.887,11.147-6.887S58.2,89.781,58.2,93.584z')
    .fill(color)
}

export function mouth() {
  const group = SVG().group()
  group
    .path('M115.032,109.585c-0.317,0.177-0.642,0.354-0.975,0.517c-3.973,2.009-9.393,3.308-16.586,3.308     c-7.185,0-12.613-1.3-16.579-3.308c-0.332-0.162-0.657-0.34-0.975-0.517c-10.346-5.871-9.593-16.785-4.217-19.924     c0.155-0.089,0.303-0.17,0.465-0.244c7.99-3.818,15.257,3.397,21.305,3.397c6.055,0,13.322-7.215,21.312-3.397     c0.162,0.074,0.31,0.155,0.465,0.244C124.625,92.8,125.378,103.714,115.032,109.585z')
    .fill('#240B4A')
  group
    .path('M114.057,110.102c-3.973,2.009-9.393,3.308-16.586,3.308c-7.185,0-12.613-1.3-16.579-3.308     c0.414-0.332,0.857-0.65,1.322-0.953c3.508-2.297,8.485-3.825,15.257-3.825c6.779,0,11.756,1.529,15.264,3.825     C113.201,109.452,113.644,109.77,114.057,110.102z')
    .fill('#FF7271')
  group
    .path('M119.247,89.661c-0.15-0.085-0.304-0.166-0.462-0.243c-7.987-3.821-15.261,3.395-21.309,3.395     c-6.048,0-13.322-7.217-21.309-3.395c-0.158,0.077-0.312,0.158-0.463,0.243c-0.373,1.424-0.677,2.945-0.414,3.367     c0.531,0.848,9.448,5.837,22.185,5.837c12.738,0,21.654-4.99,22.185-5.837C119.924,92.607,119.62,91.085,119.247,89.661z')
    .fill('#ffffff')

  return group
}
