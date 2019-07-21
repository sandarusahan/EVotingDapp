
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.GenerateElectionResult} result
 * @transaction
 */

async function electionResult(result) {


    var factory = getFactory();
    var namespace = "org.evotedapp.biznet";    
 
    return getAssetRegistry("org.evotedapp.biznet.VoteCountCandidate")
        .then(registry => {
            voteCountCandidate = factory.newResource(namespace, "VoteCountCandidate", result.voteCountCandidateId);
            voteCountCandidate.electionId = result.electionId
            voteCountCandidate.rejectedVotes = result.rejectedVotes
            voteCountCandidate.declaredVotes = result.declaredVotes
            voteCountCandidate.allVotes = result.allVotes
            voteCountCandidate.candidateId = result.candidateId
            voteCountCandidate.candidateVotes = result.candidateVotes
            return registry.add(voteCountCandidate)
        })
        .then(() => {
            var voteCountCandidateEvent = factory.newEvent(namespace, "GenerateElectionResultNotification");
            voteCountCandidateEvent.voteCountCandidate = voteCountCandidate;
            
            emit(voteCountCandidateEvent);
        });
}