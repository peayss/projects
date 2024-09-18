const express = require('express')
const app = express()
app.use(express.json())
app.listen(1111)

let db = new Map()
var id = 1

//책 제목, 저자 등록하기
app.post('/register', (req, res)=> {
    if (req.body != {}){
        db.set(id++, req.body)
        res.status(201).json({ //201 : 등록 성공!
            message : `${db.get(id-1).title} 책이 등록되었습니다.`
        })
    }
    else{
        res.status(400).json({ //잘못된 요청
            message : "입력 값을 다시 확인해주세요."
        })
    }
})
//책 전체 조회
app.get('/books', (req, res)=> {
    var books = {}
    if (db.size){
        db.forEach(function(value, key){
            books[key] = value
        })
        res.status(200).json(books)
    }
    else{
        res.status(400).json({ //잘못된 요청
            message : "조회할 책이 없습니다."
        })
    }
})
//책 개별 조회 (id로 조회)
app.get('/books/:id', (req, res)=> {
    let { id } = req.params;
    id = parseInt(id);

    var book = db.get(id);
    if (book) {
      res.status(200).json(book);
    } else {
        res.status(400).json({ //잘못된 요청
            message : "요청하신 id의 책은 없습니다."
        })
    }
})
//책 개별 삭제
app.delete('/books/:id', (req, res)=> {
    let { id } = req.params;
    id = parseInt(id);

    var books = db.get(id);
    if (books) {
      db.delete(id);
      res.status(200).json({
        message: `${books.title} 책이 정상적으로 삭제되었습니다.`,
      });
    } else {
        res.status(400).json({ //잘못된 요청
            message : "삭제하실 책의 정보가 없습니다."
        })
    }
  })
//책 개별 조회 (책 제목으로 조회)
app.post('/books', (req, res)=> {
    var { title } = req.body;
    var books = [];

    if (db.size && title) {
      db.forEach(function (value, key) {
        if (value.title === title) 
            books.push(value);
      });
      if (books.length) {
        res.status(200).json(books);
      } else {
        res.status(400).json({ //잘못된 요청
            message : "해당 제목의 책의 정보가 없습니다."
        })
      }
    } else {
        res.status(400).json({ //잘못된 요청
            message : "해당 제목의 책의 정보가 없습니다."
        })
    }
})