const config = {
  player_speed: 10,
  stone_speed: 5,
  bullet_speed: 20,
  fire_cooldown: 0,
}
class Scene extends GuaScene {
  constructor(game) {
    super(game)

    this.setup()
    this.setupInputs()
  }

  setupInputs() {
    var g = this.game
    var s = this

    g.registerAction('a', function () {
      s.player.moveLeft()
    })
    g.registerAction('d', function () {
      s.player.moveRight()
    })
    g.registerAction('w', function () {
      s.player.moveUp()
    })
    g.registerAction('s', function () {
      s.player.moveDown()
    })
    g.registerAction('j', function () {
      s.player.fire()
    })


  }

  setup() {
    this.bg = GuaImage.new(this.game, 'sky')
    this.numberOfEnemies = 10
    this.stone = Stone.new(this.game)
    // this.player = GuaImage.new(this.game, 'player')

    this.player = Player.new(this.game)
    this.player.x = 100
    this.player.y = 150
    this.addElements(this.bg)
    this.addElements(this.stone)
    this.addElements(this.player)
    this.addEnmies()
  }

  addEnmies() {
    var es = []
    for (var i = 0; i < this.numberOfEnemies; i++) {
      var e = Enemy.new(this.game)
      es.push(e)
      this.addElements(e)
    }
    this.enemies = es
  }

  update() {
    super.update()
    this.stone.y += 1
  }

}

class Player extends GuaImage {
  constructor(game) {
    super(game, 'player')
    this.setup()
  }

  setup() {
    this.speed = 10
    this.coolDown = 0
  }

  update() {
    this.speed = config.player_speed
    if (this.coolDown > 0) {
      this.coolDown--
    }
  }

  moveLeft() {
    this.x -= this.speed
  }

  moveRight() {
    this.x += this.speed
  }

  moveUp() {
    this.y -= this.speed
  }

  moveDown() {
    this.y += this.speed
  }

  fire() {
    if (this.coolDown === 0) {
      this.coolDown = config.fire_cooldown
      var x = this.x + this.w / 2
      var y = this.y
      var b = Bullet.new(this.game)
      b.x = x - b.w / 2
      b.y = y
      this.scene.addElements(b)
    }

  }
}

class Bullet extends GuaImage {
  constructor(game) {
    super(game, 'bullet')
    this.setup()
  }

  setup() {
    this.speed = config.bullet_speed
  }

  update() {
    this.y -= this.speed
  }
}

const randomBewteen = function (start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

class Enemy extends GuaImage {
  constructor(game) {
    var type = randomBewteen(0, 4)
    var name = 'enemy' + type
    super(game, name)
    this.setup()
  }

  setup() {
    this.speed = randomBewteen(2, 6)
    this.x = randomBewteen(0, 300)
    this.y = -randomBewteen(0, 200)
  }

  update() {
    this.y += this.speed
    if (this.y > 600) {
      this.setup()
    }
  }

}

class Stone extends GuaImage {
  constructor(game) {

    super(game, 'stone')
    this.setup()
  }

  setup() {
    this.speed = randomBewteen(2, 4)
    this.x = randomBewteen(0, 350)
    this.y = -randomBewteen(0, 200)
  }

  update() {
    this.y += this.speed

    if (this.y > 600) {
      this.setup()
    }
  }
  debug() {
    this.speed = config.stone_speed
  }

}

// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
