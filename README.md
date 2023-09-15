# Chubriks
Generative NFT project on https://fxhash.xyz
Project link: 

## Install, run, build
```
pnpm install
```
```
pnpm dev
```
```
pnpm build
```

## About project
I used [FSD](https://feature-sliced.design/docs/get-started/overview) architectural methodology. In FSD, a project consists of layers, each layer is made up of slices and each slice is made up of segments. 
The code is organized by scope of influence (layers), by domain (slices), and by technical purpose (segments). A module on a particular layer cannot use other modules on the same layer, or the layers above.
This enables isolated modifications without unforeseen consequences.

```
src
├── app
├── entities
│   ├── canvas
│   ├── effects
│   │   └── ui
│   ├── face
│   │   └── ui
│   ├── filters
│   │   └── ui
│   ├── gradient
│   ├── head
│   ├── palette
│   └── patterns
│       └── ui
├── features
│   ├── add-edge
│   ├── add-effect
│   ├── add-gradient
│   ├── add-node
│   ├── add-pattern
│   ├── clean-unused-data
│   ├── delete-edge
│   ├── delete-effect
│   ├── delete-gradient
│   ├── delete-node
│   └── draw-canvas
├── pages
│   ├── editor
│   └── preview
├── shared
│   ├── config
│   ├── lib
│   │   ├── draw
│   │   │   ├── effects
│   │   │   ├── filling
│   │   │   ├── filters
│   │   │   ├── layers
│   │   │   ├── model
│   │   │   └── patterns
│   │   ├── flow
│   │   └── fxhash
│   └── ui
└── widgets
    ├── back-node
    ├── effects-node
    ├── face-node
    ├── gradient-node
    ├── head-node
    ├── palette-node
    ├── pattern-node
    └── result-node
```

[Effector.js](https://effector.dev/) for state managment. It's built around the reactive programming paradigm, making it well-suited for applications that require real-time updates and synchronization of data. It allows you to create declarative, data-driven UIs.

[Reactflow](https://reactflow.dev/) to build node-based editor. It comes with seamless zooming & panning, customizable node and edge types, single and multi-selection, several event handlers and more.

### Another tools
- [Vite](https://vitejs.dev/) instead webpack
- Typescript for buisness logic
- Auto gzip on build




