import { useState,useEffect } from 'react'
import {Block,Point} from "./block"
import TetrisBoard from "./TetrisBoard"
import './App.css'

function App() {
  const [blocks,setBlocks] = useState<Block[]>([] as Block[])
  useEffect(function()
  {
    setInterval(function()
    {
      setBlocks((blocks)=>[...blocks,getRandomBlock()])
    })
  })
  return (
    <>
      <TetrisBoard blocks={blocks}></TetrisBoard>
    </>
  )
}



function getRandomBlock()
{
  return new Block([new Point(0,0),new Point(0,1),new Point(1,0),new Point(1,1)])
}

export default App
