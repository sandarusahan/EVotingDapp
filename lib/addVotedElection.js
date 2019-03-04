/**
 * verify voter eligibility transaction
 * @param {org.evotedapp.biznet.addVotedElection} addElection
 * @transaction
 */
async function addVotedElection(addElection) {
    if (addElection.voter.nic != null) {
        if (addElection.voter.isEligible) {
            addElection.voter.votedElections = addElection.newElection;
            return getAssetRegistry("org.evotedapp.biznet.Voter")
                .then(assetRegistry => {
                    return assetRegistry.update(addElection.voter); // Update the network registry
                })
                .then(() => {
                    let event = getFactory().newEvent("org.evotedapp.biznet", "addVotedElectionNotification"); // Get a reference to the event specified in the modeling language
                    event.voter = addElection.voter;
                    emit(event); // Fire off the event
                });
        }
    }
    else {
        console.log("This voter is not valid");
    }
}
