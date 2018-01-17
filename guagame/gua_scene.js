class GuaScene {
  constructor(game) {
    this.game = game
    this.elements = []
  }

  static new(game) {
    var i = new this(game)
    return i
  }
  addElements(e) {
    this.elements.push(e)
  }
  draw() {
    log('1111')
    for (var i = 0; i<this.elements.length; i++){
      var e = this.elements[i]
      log(e,'1')
      this.game.drawImage(e)
    }
  }

  update() {

  }
}
