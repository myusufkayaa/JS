class ReadJSON {
    constructor (filePath) {
        this.filePath = filePath
        this.data = null
        this.readData()
    }
    
    toString () {
        return this.filePath + ''
    }

    readData () {
        document.getElementById('subTitle').innerText = this.filePath
        fetch(this.filePath)
        .then(res => res.json()) 
        .then(res => {
            this.data = res
            document.getElementById('info').innerHTML = 'manifest.json is read'
            this.fillTable()
        })
        
    }

    fillTable () {
        var table = document.getElementById('datas')
        table.innerHTML = '<tr><th>Name</th><th>Diam</th><th>Mass</th><th>Radius</th><th>Period</th></tr>'
        var tableValues = Object.values(this.data)
        for(let item of tableValues){
             table.innerHTML += '<tr><th>' + item.Name + '</th><th>'+ item.Diam + '</th><th>'+ item.Mass +'</th><th>'+ item.Radius +'</th><th>'+ item.Period + '</th></tr>'
        }
        
    }
}