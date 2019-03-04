/**
 * verify voter eligibility transaction
 * @param {org.evotedapp.biznet.verifyPolitician} politicianVerification
 * @transaction
 */
async function verifyPolitician(politicianVerification) {
    if (politicianVerification.politician.politicianId != null) {
        if (!politicianVerification.politician.hasVarified) {
            politicianVerification.politician.hasVarified = true;
            return getAssetRegistry("org.evotedapp.biznet.Politician")
                .then(assetRegistry => {
                    return assetRegistry.update(politicianVerification.politician); // Update the network registry
                })
                .then(() => {
                    let event = getFactory().newEvent("org.evotedapp.biznet", "verifyPoliticianNotification"); // Get a reference to the event specified in the modeling language
                    event.politician = politicianVerification.politician;
                    emit(event); // Fire off the event
                });
        }
    }
    else {
        console.log("This politician is not valid");
    }
}
