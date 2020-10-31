controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Peter_Fan.vy == 0 && Peter_Fan.vx == 0) {
        Peter_Fan.vy = -100
        Peter_Fan.setImage(img`
            9 9 9 9 9 9 9 9 
            . 9 9 9 9 9 9 . 
            d 7 7 9 9 7 7 d 
            8 7 7 9 9 7 7 8 
            8 7 7 9 9 7 7 8 
            d 9 a a a a 9 d 
            . 8 9 a a 9 8 . 
            . . 8 9 9 8 . . 
            `)
        Peter_Fan.image.flipY()
        Peter_Fan.startEffect(effects.trail, 100)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Peter_Fan.vy == 0 && Peter_Fan.vx == 0) {
        Peter_Fan.vx = -100
        Peter_Fan.setImage(img`
            9 . d 8 8 d . . 
            9 9 7 7 7 9 8 . 
            9 9 7 7 7 a 9 8 
            9 9 9 9 9 a a 9 
            9 9 9 9 9 a a 9 
            9 9 7 7 7 a 9 8 
            9 9 7 7 7 9 8 . 
            9 . d 8 8 d . . 
            `)
        Peter_Fan.image.flipX()
        Peter_Fan.startEffect(effects.trail, 100)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Peter_Fan.vy == 0 && Peter_Fan.vx == 0) {
        Peter_Fan.vx = 100
        Peter_Fan.setImage(img`
            9 . d 8 8 d . . 
            9 9 7 7 7 9 8 . 
            9 9 7 7 7 a 9 8 
            9 9 9 9 9 a a 9 
            9 9 9 9 9 a a 9 
            9 9 7 7 7 a 9 8 
            9 9 7 7 7 9 8 . 
            9 . d 8 8 d . . 
            `)
        Peter_Fan.startEffect(effects.trail, 100)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Peter_Fan.vy == 0 && Peter_Fan.vx == 0) {
        Peter_Fan.vy = 100
        Peter_Fan.setImage(img`
            9 9 9 9 9 9 9 9 
            . 9 9 9 9 9 9 . 
            d 7 7 9 9 7 7 d 
            8 7 7 9 9 7 7 8 
            8 7 7 9 9 7 7 8 
            d 9 a a a a 9 d 
            . 8 9 a a 9 8 . 
            . . 8 9 9 8 . . 
            `)
        Peter_Fan.startEffect(effects.trail, 100)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 100)
    info.changeScoreBy(1)
})
let heater_shard: Sprite = null
let Peter_Fan: Sprite = null
game.showLongText("You are a fan, a very cold fan. send bursts of air with the arrow keys. You roll until you hit a wall. Collect all the heater parts to build a heater. Why a heater? Because you are a fan, a very cold fan.", DialogLayout.Full)
let direction = 0
custom.setTilemap(tilemap`level`)
Peter_Fan = sprites.create(img`
    9 . d 8 8 d . . 
    9 9 7 7 7 9 8 . 
    9 9 7 7 7 a 9 8 
    9 9 9 9 9 a a 9 
    9 9 9 9 9 a a 9 
    9 9 7 7 7 a 9 8 
    9 9 7 7 7 9 8 . 
    9 . d 8 8 d . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(Peter_Fan, myTiles.tile4)
for (let value of tiles.getTilesByType(myTiles.tile5)) {
    heater_shard = sprites.create(img`
        b b . . . . . . 
        b e b . . . . . 
        . b b b . . . . 
        . . b b b . . . 
        . . . b b b . . 
        . . . . b b b . 
        . . . . . b e b 
        . . . . . . b b 
        `, SpriteKind.Food)
    tiles.placeOnTile(heater_shard, value)
    if (Math.ceil(tiles.locationXY(value, tiles.XY.column) / 2) == 0) {
        tiles.setTileAt(value, myTiles.tile2)
    } else {
        tiles.setTileAt(value, myTiles.tile3)
    }
}
forever(function () {
    if (info.score() == 6) {
        pause(500)
        game.showLongText("You found all the parts! You built a heater!", DialogLayout.Bottom)
        game.over(true, effects.confetti)
    }
})
