import React from 'react'
import ShimmerItem from './ShimmerItem'

const ShimmerForm = (props)=> {

    const renderShimmerInputs = () => {
        let inputs = []

        for(let i = 0; i < props.inputNumber; i++){
            inputs.push(
                <>
                <label className='shimmer-label'>
                    <ShimmerItem/>
                </label>
                <div className='shimmer-input-wrapper'>
                    <ShimmerItem/>
                </div>
                </>
            )
        }
        return inputs
    }

    return(
        <main>
        <form>
            <fieldset>
            <legend className='shimmer-legend'>
                <ShimmerItem/>
            </legend>
            <section className='inputs-section'>    
            {renderShimmerInputs()}       
            </section>
            <section className='button-section'>
                <button className='shimmer-button'></button>
            </section>
            </fieldset>
        </form>
    </main>
    )
}

export default ShimmerForm