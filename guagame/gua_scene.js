class GuaScene {
  constructor(game) {
    this.game = game
    this.debugMode = true
    this.elements = []
  }

  static new(game) {
    var i = new this(game)
    return i
  }
  addElements(e) {
    e.scene = this
    this.elements.push(e)
  }
  draw() {
    for (var i = 0; i<this.elements.length; i++){
      var e = this.elements[i]
      this.game.drawImage(e)
    }
  }

  update() {
    if (this.debugMode) {
      for (var i = 0; i<this.elements.length; i++){
        var e = this.elements[i]
        e.debug && e.debug()
      }
    }

    for (var i = 0; i<this.elements.length; i++){
      var e = this.elements[i]
      e.update()
    }
  }
}
