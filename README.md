# KIRBYSEED3000

Start simple™

Kirby flavored SEED3000 ✨

[KirbyCMS Documentation](https://getkirby.com/docs)

Note: This is my personal "getting started" package for things I build on the web. Sometimes we need some help from our friends, and this time, it's Kirby. Covers basically what you need to get something going– an experiment, prototype, a single page site, or the beginnings of something grand. I hope you find this useful! Enjoy.

Important note: Kirby is free to try, but you need a license when you deploy. Trust me, it's good. Flexible, versatile, uncluttered.

## Features
- Basic setup to get you started
- Running Kirby 2.4.1
- No frills
- Runs on gulp
- Compiles all your templates.php, even use Twig!
- Compresses images
- Clean and easy media queries via Rupture
- Autoprefix, because yolo
- ES6 support
- Live reload
- Module up with Webpack
- Cute log messages with emojis (that's right!)


## Why?

I've been trying to look for a simple and straight-forward setup when building stuff on Kirby– found none! So here's
something packaged up I've made for my own use and sharing it to you all! I hope you find it useful.

What this does not attempt to accomplish:
- This does not attempt to change the world, or revolutionise anything, it's just a starter kit you guys. Use it as you wish! Improve it! Build on top of it!
- It will not automatically build amazing things for you, you have to do it. But this does get rid of the 'setup' and 'plumbing' noise and allows you to just jump in.
- This started HAS NOT altered Kirby in any way. It's Vanilla, you can do all your magic on top.

Start simple!

## Usage

A) Install yarn (https://yarnpkg.com/lang/en/) `npm install -g yarn`

1. Clone this repo `git clone repoUrl [optional folder name]`

2. `cd` to wherever you cloned it then run `yarn` to install dependencies

3. Run `npm run dev` (A browser will open up with a little welcome message)

4. Start coding

5. When you're ready to deploy, just run `npm run prod`, this minifies/compresses/use all templates/css/images

* Constantly a [WIP]

## Plugs for the plugins included

- Be stylish with your CSS via Stylus (http://stylus-lang.com/)
- HTML? You can also do Twig when you make templates! (http://twig.sensiolabs.org/)
- Rupture makes meida queries super clean and easy (https://github.com/jescalan/rupture)
  ```
    // In stylus– note the nesting
    .some-div {
      position: absolute;
      width: 300px;
      height: 300px;

      // see how clean and easy, see docs on usage!
      +below(600px) {
        width: 100px;
        height: 100px;
      }
    }
  ```
- ES6! Use arrow functions, imports and all that new syntax jazz


**Notes on images:**
Put all image image assets in source/images. When using images in html/templates/css while in dev just use `images/**/filename.xxx` as the src. It will be automatically be changed to `sources/images/**/filename` (when in dev) or `assets/img/**/filename` (in prod). Forget about paths, Just... `images`.

## Say hi!
The is completely free but I'd love to know if you have found it useful or improved it in any way! Drop me a line at ezekielaquino@gmail.com or via [@the_ezekiel](http://twitter.com/the_ezekiel) on Twitter! or better yet, [Share it on Twitter](https://twitter.com/home?status=%F0%9F%8D%AD%20KirbySeed3000%20%E2%80%93%20A%20Kirby%20flavored,%20no%20frills,%20super%20simple%20build%20setup%20http%3A//github.com/ezekielaquino/KirbySeed3000)!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details