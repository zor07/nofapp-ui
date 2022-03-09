import React from "react";


const PracticeListContainer = ({isPublic}) => {
    return (
        <div>
            {
                isPublic
                    ? 'All Practices'
                    : 'My Practices'
            }

        </div>
    )

}

export default PracticeListContainer