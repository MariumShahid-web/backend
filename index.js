import express from "express";

const app = express();

app.use(express.json())
//api
// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

// app.get("/weather",(req,res)=>{
//     res.status(200).json({
//         city:"Lahore",
//         temp_c: 30,
//     })
// })



let products=[
    {
        id: 1,
        name: "Product 1",
        price: 5400,
        imageUrl:
          "https://webx.pk",
        desc: "A powerful graphics card from china.",
    },
    
  {
    id: 2,
    name: "RTX 3060",
    price: 93000,
    imageUrl:
      "https://webx.pk",
    desc: "A powerful graphics card from nvidia.",
  },
];

app.get("/products", (req, res) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Something Went Wrong" });
  }
});

app.post("/products", (req,res)=>{
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json(newProduct)
})

app.delete("/products/:id",(req,res)=>{
  const {id}= req.params;
  products = products.filter((product) => product.id !== parseInt(id))
  res.status(204).send()
})

app.put("/products/:id",(req,res)=>{
  const { id }=req.params;
  const updatedProduct =req.body;
  const index = products.findIndex((product)=>product.id === parseInt(id));
  if(index !== -1){
    products[index] = {...products[index], ...updatedProduct};
    res.json(products[index]);
  } else{
    res.status(404).json({message: "Product not found"});
  }
})

app.listen(5050,()=>{
    console.log("server is running on port 5050")
})