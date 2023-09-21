import "./Flash.css"

function FlashPage ({setShowFlash}:any) {

    const handleClick = () => {
        setShowFlash(false);
    }

    return (
        <div className="typewriter">
            <h1>Welcome to payment page click on pay now to start your payment process</h1>
            <button onClick={handleClick} className="button">Pay Now</button>
        </div>
    )
}

export default FlashPage;