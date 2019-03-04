/**
 * Vote transaction
 * @param {org.evotedapp.biznet.VoteTransaction} vote
 * @transaction
 */
async function voteParty(vote) {

    if(vote.ballot.balStatus = "New"){
        if(vote.voter.isEligible) {
            if(!vote.voter.hasVoted) {
                vote.ballot.voter = vote.voter;

                return getAssetRegistry("org.evotedapp.biznet.Ballot")
        .then(assetRegistry => {
            return assetRegistry.update(vote.ballot); // Update the network registry
        })
        .then(() => {
            let event = getFactory().newEvent(
            "org.evotedapp.biznet",
            "VoteNotification"
            ); // Get a reference to the event specified in the modeling language
            event.ballot = vote.ballot;
            emit(event); // Fire off the event
        });
            }else{
                console.log("This voter has already voted")
            }
        }else{
            console.log("Voter is not eligible")
        }

    }else {
        console.log("Not a new ballot paper")
    }
}

