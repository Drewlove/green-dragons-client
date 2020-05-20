import React from 'react'
import StudentName from '../../_Common/StudentName'
const StudentFormSubcommunities = (props) => {

    const handleCheckboxChange = (e) => {
        e.currentTarget.blur()
        props.handleChange(e)
    }

    const {mergedCommunities} = props
        const renderCommunities = () => {
        return Object.keys(mergedCommunities).map(key => {
            const community = mergedCommunities[key]
            return(
            <React.Fragment key={community.community_id}>
                <h3 className='student-form-subcommunities-community'>{community.community_name}</h3>
                <section className='student-form-subcommunities-section'>
                    {renderSubcommunities(community.subcommunities)}
                </section>     
            </React.Fragment>
                )      
        })
    }

    const renderSubcommunities = (subcommunities) => {
        return subcommunities.map(subcommunity => {
            return (  
                <React.Fragment key={subcommunity.subcommunity_id}>           
                    <input 
                        id={subcommunity.subcommunity_id} 
                        name='subcommunities' 
                        className='student-form-subcommunities-input' 
                        type='checkbox' 
                        value={subcommunity.subcommunity_id} 
                        onChange={e =>handleCheckboxChange(e)}
                        checked={isChecked(subcommunity.subcommunity_id)}
                    />

                    <label className='student-form-subcommunities-label'>
                        {subcommunity.subcommunity_name}
                    </label>
                </React.Fragment>
            )
        })
    }

    const isChecked = (subcommunityId) => {
        return props.studentSubcommunitiesUpdated.indexOf(subcommunityId) >= 0 ? true : false
    }

    return(
        <>
        <header>
            <StudentName studentId={props.studentId}/>
        </header>
        <main>
            <form className='student-form-subcommunities' onSubmit={e => props.handleSave(e)}>
                <fieldset>
                <legend>
                    <h2>Communities</h2>
                </legend>
                    {renderCommunities()}   
                <section className='button-section'>
                    <button className='button-primary'>Save</button>
                </section>
            </fieldset>
            </form>
        </main>
        </>
    )
}

export default StudentFormSubcommunities