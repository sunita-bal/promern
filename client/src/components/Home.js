import React from 'react'

const Home = () => {
    return (
        <div className='background'>
            <div className="text">
            <h1 className='pb-2'>Enjoy big movies, hit series and more from Rs 149.</h1>
            <h4 className='pb-3'>Join today. Cancel anytime</h4>
            <p>Ready to watch? Enter your email to create or restart your membership</p>
            </div>
            

           
            <div class="form-container">
        <div class="form-group">
            <input type="email" class="form-input" id="emailInput" placeholder=" "/>
            <label for="emailInput" class="floating-label">Email address</label>
        </div>
        <div class="button-container">
            <button class="submit-button">Get Started</button>
        </div>
    </div>
        </div>
    )
}

export default Home
