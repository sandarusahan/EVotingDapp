
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.VoteTransaction} vote
 * @transaction
 */
async function voteParty(vote) {

        var factory = getFactory();
        var namespaceVote = "org.evotedapp.biznet";

        var newBallot = factory.newResource(namespaceVote, "Ballot", vote.election.electionId+"_"+vote.ballotId);
        newBallot.votedCandidate = vote.votedCandidate;
        newBallot.pollingStation = vote.votedPolingStation;
        newBallot.election = vote.election;
        if(vote.votedCandidate == "resource:org.evotedapp.biznet.Politician#000"){
            newBallot.balStatus = "Rejected"
        }else{
            newBallot.balStatus = "Casted"
        }

        return getAssetRegistry(newBallot.getFullyQualifiedType())
                .then(registry => {
                    return registry.add(newBallot);
                })
                .then(() => {
                    var voteEvent = factory.newEvent(namespaceVote, "VoteNotification");
                    voteEvent.ballot = newBallot;
                    emit(voteEvent);
                });
    
        

    
}