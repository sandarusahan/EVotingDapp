
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.StartVotingTransaction} election
 * @transaction
 */
async function startVoting(election) {

    return getAssetRegistry("org.evotedapp.biznet.Election")
            .then(registry => {
                return registry.get(election.currentElectionId);
            })
            .then(currentElection => {
                var factory = getFactory();
                currentElection.electionStatus = "Voting_Started"
                return getAssetRegistry(currentElection.getFullyQualifiedType())
                .then(electRegistry => {

                    return electRegistry.update(currentElection);
                })
                .then(() => {
                    var startVoteEvent = factory.newEvent("org.evotedapp.biznet", "StartVotingNotification");
                    startVoteEvent.election = currentElection;
                    emit(startVoteEvent);
                })
                
            })            
                


}