/**
 * verify voter eligibility transaction
 * @param {org.evotedapp.biznet.verifyEligibility} eligibility
 * @transaction
 */
async function setAsIneligible(eligibility) {
    if (eligibility.voter.nic != null) {
        if (eligibility.voter.isEligible) {
            eligibility.voter.isEligible = false;
        }
        console.log(eligibility.voter.nic + "'s eligibility has changed to" + eligibility.voter.isEligible);
        return getAssetRegistry("org.evotedapp.biznet.Voter")
            .then(assetRegistry => {
                return assetRegistry.update(eligibility.voter); // Update the network registry
            })
            .then(() => {
                let event = getFactory().newEvent("org.evotedapp.biznet", "verifyEligibilityNotification"); // Get a reference to the event specified in the modeling language
                event.voter = eligibility.voter;
                emit(event); // Fire off the event
            });
    }
    else {
        console.log("This voter is not valid");
    }
}
