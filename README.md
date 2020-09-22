
# Vue Sparkles
A Vue component making things a little sparklier

![npm bundle size](https://img.shields.io/bundlephobia/minzip/vue-sparkles)
![npm](https://img.shields.io/npm/v/vue-sparkles)
![GitHub issues](https://img.shields.io/github/issues/Thaiten/Vue-Sparkles)
![NPM](https://img.shields.io/npm/l/vue-sparkles)
![AppVeyor](https://img.shields.io/appveyor/build/Thaiten/Vue-Sparkles)

## What is Vue Sparkles?
Vue Sparkles is the Vue.JS variant of [Josh W Comeau's animated sparkles for React](https://joshwcomeau.com/react/animated-sparkles-in-react/).
I took a couple of different approaches to the idea than he did. And I had to, since this is Vue and not React, of course :)
It is essentially the same though.

It could look like this in action

![Preview of a sparkling header](https://i.imgur.com/jo9H0Ea.gif) 

## How to install it
easy, in your command line of choice:

    npm install vue-sparkles --save
You have it installed. Now we just have to import it:
in your main.js import the component like this

    import VueSparkles from  'vue-sparkles';
  And then we have to tell Vue to use it.
  

    Vue.use(VueSparkles);
## How to use Vue Sparkles?
Just wrap your soon-to-be sparkly element in a \<VueSparkles> tag. That could look as follows

    <VueSparkles><h1>What a great looking Header this is</h1></VueSparkles>
Or like so

    <VueSparkles><img src="@/assets/img/some-image.png" alt="A sparkling image" /></VueSparkles>
You want to get more into customization? No problem!
### Customization
#### Colors
You can pass a color prop to apply a custom color. Only an HSL style of colors work though. If you don't pass any color prop all sparkles will use the default of `hsl(50deg, 100%, 50%)`

    <VueSparkles
      color="hsl(0deg, 100%, 50%)">
        <h1>What a great looking Header this is</h1>
    </VueSparkles>
Alright, alright, I understand. You are thirsty now. You want more. No problem. **Multiple Colors!**
To achieve that, I find it easiest to bind the color prop to a variable. Said var could look like this

    color: [
        {
          h: '0',
          s: '100',
          l: '50'
        },
        {
          h: '50',
          s: '100',
          l: '50'
        }
      ]
  This will give you a nice rainbowy effect of colors ranging from red to yellow for example. *Notice how I only changed the hue and left the saturation and luminance the same. I would urge you to do the same if you don't intentionally aim for a different effect.*
  #### Paths
  You can also use different paths. If you don't pass a path object, all sparkles will use the default star sparkle [created by Josh Comeau](https://joshwcomeau.com/react/animated-sparkles-in-react/#creating-an-asset).
  **There is a restriction however!** Since you are only changing the path, you won't be able to change stuff such as viewBox or stroke. That means you will be limited to filled SVGs, no outline icons here. Also, the viewBox is `0 0 160 160`, so if your path doesn't respect that it is either cut on the viewBox borders or it will be so small you can't see it.

So, this should be pretty self-explanatory. For a single path you just have to pass the path-string through the path prop. That could look like this:

    <VueSparkles
      path="...">
      <h1>What a great looking Header this is</h1>
    </VueSparkles>
For multiple paths, just bind the path-prop to an array containing the paths.
## Features

- [x] Sparkles behind and in front of the child element
- [x] Color Prop
- [x] Multiple colors
- [x] Custom Path
- [ ] Click to disable
- [ ] Outline SVGs (?)
## Contribute
If you think this can be optimized in any way, please feel free to do so, this is open source after all :)
