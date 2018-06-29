## meet-cli

Meet-cli is a command line interface for [multiages-generator](https://github.com/linweiwei123/multipages-generator). It is created for fast develop.
Like new module、build、analysis、git options、upload and so on.

### install

```
npm install meet-cli -g

```

### meet --help
```
  Usage: index [options] [command]

  Options:

    -v, --version   output the version number
    -h, --help      output usage information

  Commands:

    init            initialize your meet config
    new [module]    generator a new module
    build [module]  git build specify module and assets upload to CDN!
    publish         upload assets to CDN and git commit && push
    upload          upload your build dist files to CDN server
    analysis        analysis dist files size and percent
    question        analysis dist files size and percent

```

### meet init

initial to create meet.config.js
```
meet init
```

[see more detail](http://medium.yintage.com/?p=281)