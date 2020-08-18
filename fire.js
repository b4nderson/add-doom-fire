class Fire {
    constructor(context, width, height, proportionalValue, backgroundIntensity) {
        this.firePixelsArray = []
        this.context = context
        this.backgroundIntensity = backgroundIntensity
        this.proportionalValue = proportionalValue
        this.width = width
        this.height = height
        this.fireWidth = this.width / this.proportionalValue
        this.fireHeight = this.height / this.proportionalValue
        this.numberOfPixels = this.fireWidth * this.fireHeight
        this.requestAnimationFrame = null
        this.stopFire = false
        this.fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
    }

    Start() {
        this.stopFire = false
        this.CreateFireDataStructure()
        this.CreateFireSource()
        this.RenderFire()
        this.CalculateFirePropagation()
    }

    Stop() {
        this.stopFire = true

        setTimeout(() => {
            this.context.fillStyle = "black"
            this.context.fillRect(0, 0, this.width, this.height)

            cancelAnimationFrame(this.requestAnimationFrame)
        }, 20)
    }

    CreateFireDataStructure() {
        for (let index = 0; index < this.numberOfPixels; index++) {
            this.firePixelsArray[index] = 0
        }
    } 

    CalculateFirePropagation() {
        for (let column = 0; column < this.fireWidth; column++) {
            for (let row = 0; row < this.fireHeight; row++) {
                const pixelIndex = column + (this.fireWidth * row)
                this.UpdateFireIntensityPerPixel(pixelIndex)
            }
        }

        this.RenderFire()

        this.requestAnimationFrame = requestAnimationFrame(() => {
            this.CalculateFirePropagation()
        })
    }

    UpdateFireIntensityPerPixel(currentPixelIndex) {
        const belowPixelIndex = currentPixelIndex + this.fireWidth

        if (belowPixelIndex >= this.numberOfPixels) {
            return
        } 

        const decay = Math.floor(Math.random() * 3)
        const belowPixelFireIntensity = this.firePixelsArray[belowPixelIndex]

        let newFireIntensity = 0

        this.stopFire === true ? 
            (
                newFireIntensity = 0
            ) : 
            (
                newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : this.backgroundIntensity
            )
        
        this.firePixelsArray[currentPixelIndex - decay] = newFireIntensity 
    }
    
    RenderFire() {
        for (let column = 0; column < this.fireWidth; column++) {
            for (let row = 0; row < this.fireHeight; row++) {
                const pixelIndex = column + (this.fireWidth * row)
                const fireIntensity = this.firePixelsArray[pixelIndex]

                const color = this.fireColorsPalette[fireIntensity]
                const colorString = `${color.r},${color.g},${color.b}`

                this.context.fillStyle = `rgba(${colorString})`
                this.context.fillRect(column * this.proportionalValue, row * this.proportionalValue, this.proportionalValue, this.proportionalValue)
            }
        }
    }

    CreateFireSource() {
        for (let column = 0; column < this.fireWidth; column++) {
            const pixelIndex = (this.numberOfPixels - this.fireWidth) + column
            this.firePixelsArray[pixelIndex] = 36
        }
    }   
}

module.exports = Fire