/**
 * Buy card transaction
 * @param {org.evotedapp.biznet.changePassword} pwd
 * @transaction
 */
async function changePassword(pwd) {
    // if(pwd.user.nic) {
    pwd.user.password = pwd.newPass;
    return getAssetRegistry("org.evotedapp.biznet.User")
        .then(assetRegistry => {
            return assetRegistry.update(pwd.user); // Update the network registry
        })
        .then(() => {
            let event = getFactory().newEvent("org.evotedapp.biznet", "changePasswordNotification"); // Get a reference to the event specified in the modeling language
            event.user = pwd.user;
            emit(event); // Fire off the event
        });
}
