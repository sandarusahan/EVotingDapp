/**
 * verify admin transaction
 * @param {org.evotedapp.biznet.verifyAdmin} admin
 * @transaction
 */
async function verifyAdmin(admin) {
    if (admin.admin.adminId != null && !admin.admin.hasVerified) {
        admin.admin.hasVerified = true;
        return getAssetRegistry("org.evotedapp.biznet.Admin")
            .then(assetRegistry => {
                return assetRegistry.update(admin.admin); // Update the network registry
            })
            .then(() => {
                let event = getFactory().newEvent("org.evotedapp.biznet", "verifyAdminNotification"); // Get a reference to the event specified in the modeling language
                event.admin = admin.admin;
                emit(event); // Fire off the event
            });
    }
    else {
        console.log("This admin is not valid to verify, maybe already verified");
    }
}
