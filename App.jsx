import React from "react"
import Fire from "./components/Fire"
import Torch from "./components/Torch"
import runBackgroundEffects from "./utilities/runBackgroundEffects"

export default function App() {
    
	const [torchEquipped, setTorchEquipped] = React.useState(false)
	const [woodKindling, setWoodKindling] = React.useState(false)
	const [woodOnFire, setWoodOnFire] = React.useState(false)
    
    const [cursorPosition, setCursorPosition] = React.useState({x: null, y: null})
	console.log("cursor pointer" +  JSON.stringify(cursorPosition))
	const kindleClass = woodKindling && !woodOnFire && "kindle"
   
    runBackgroundEffects(
	    torchEquipped,
	    woodOnFire,
	    setWoodKindling,
	    setWoodOnFire,
	    setCursorPosition
    )
	
	let torchStyle = {
		position: "absolute",
        left: cursorPosition.x - 10,
		top: cursorPosition.y - 60,
	}

  
  	function toggleTorch() {
		  setTorchEquipped(!torchEquipped)
	  }
	  
	function handleMouseEnter() {
		if (torchEquipped) {
			setWoodKindling(true)
		}
	}
	
	function handleMouseLeave() {
		if (torchEquipped && woodKindling) {
			setWoodOnFire(true)
		}
	}

	return (
		<>
		<p id="info">Take the Torch and move over the Wood to burn it</p>
		<div 
			onMouseUp={toggleTorch}
			className={`wrapper ${torchEquipped && "relative no-cursor"}`}
		>
		
			<div className={`game-area ${!torchEquipped && "relative"}`}>
	
				<div
					onMouseDown={toggleTorch}
					className={`torch-container ${torchEquipped && "torch-equipped"}`}
					style={torchEquipped ? torchStyle : null}
				>
					<Torch />	
				</div>
				
				<div 
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					className={`wood-container ${kindleClass}`}
				>
					🪵
					<Fire woodOnFire={woodOnFire} />
				</div>
				
			</div>
		</div>
		</>
	)
}