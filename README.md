
# Vue Sparkles
A Vue component making things a little bit sparklier

## What is Vue Sparkles?
Vue Sparkles is the Vue.JS variant of [Josh W Comeau's animated sparkles for React](https://joshwcomeau.com/react/animated-sparkles-in-react/).
I took a couple of different approaches to the idea than he did. And I had to, since this is Vue and not React, of course :)
It is essentially the same though.

It could look like this in action
![enter image description here](https://i.imgur.com/jo9H0Ea.gif) 

## How to install it
easy, in your commandline of choice:

    npm install vue-sparkles --save
You have it installed. Now we just have to import it:
in your main.js import the component like this

    import VueSparkles from  'vue-sparkles';
  and then we have to tell Vue to use it.
  

    Vue.use(VueSparkles);
## How to use Vue Sparkles?
Just wrap your soon-to-be sparkly element in a \<VueSparkles> tag. That could look as follows

    <VueSparkles><h1>What a great looking Header this is</h1></VueSparkles>
Or like so

    <VueSparkles><img src="@/assets/img/some-image.png" alt="A sparkling image" /></VueSparkles>
## Features

- [x] Sparkles behind and in front of the child element
- [ ] Color Prop
- [ ] Multiple colors
- [ ] Custom Path
- [ ] Click to disable
## Contribute
If you think this can be optimized in any way, please feel free to do so, this is open source after all :)
