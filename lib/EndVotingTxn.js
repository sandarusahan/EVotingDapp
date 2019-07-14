
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.EndVotingTransaction} election
 * @transaction
 */
async function endVoting(election) {

    return getAssetRegistry("org.evotedapp.biznet.Election")
            .then(registry => {
                return registry.get(election.currentElectionId);
            })
            .then(currentElection => {
                var factory = getFactory();
                currentElection.electionStatus = "Voting_Ended"
                return getAssetRegistry(currentElection.getFullyQualifiedType())
                .then(electRegistry => {

                    return electRegistry.update(currentElection);
                })
                .then(() => {
                    var endVoteEvent = factory.newEvent("org.evotedapp.biznet", "EndVotingNotification");
                    endVoteEvent.election = currentElection;
                    emit(endVoteEvent);
                })
                
            })            
                


}