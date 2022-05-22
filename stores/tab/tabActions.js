export const SET_SELECTED_TAB = "SET_SELECTED_TAB"

export const setSelectedTabSuccess = (selectedTab) => ({
    type : SET_SELECTED_TAB,
    paypload : { selectedTab }
})


export function setSelectedTab (selectedTab) {

    return dispatch => {
        dispatch(setSelectedTabSuccess(selectedTab))
    }
}