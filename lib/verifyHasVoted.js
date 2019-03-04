/**
 * verify voter eligibility transaction
 * @param {org.evotedapp.biznet.verifyHasVoted} hasVoted
 * @transaction
 */
async function verifyHasVoted(hasVoted) {
    if (hasVoted.voter.nic != null) {
        if (hasVoted.voter.isEligible) {
            if (hasVoted.voter.votedElections.find(election => election.electionId
                == hasVoted.currentElection.electionId) != null) {
                hasVoted.voter.hasVoted = true;
            }
            else {
                hasVoted.voter.hasVoted = false;
            }
            return getAssetRegistry("org.evotedapp.biznet.Voter")
                .then(assetRegistry => {
                    return assetRegistry.update(hasVoted.voter); // Update the network registry
                })
                .then(() => {
                    let event = getFactory().newEvent("org.evotedapp.biznet", "verifyHasVotedNotification"); // Get a reference to the event specified in the modeling language
                    event.voter = hasVoted.voter;
                    emit(event); // Fire off the event
                });
        }
    }
    else {
        console.log("This voter is not valid");
    }
}
