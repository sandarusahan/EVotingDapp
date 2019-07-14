
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.NewElectionTransaction} election
 * @transaction
 */
async function newElection(election) {


        var factory = getFactory();
        var namespace = "org.evotedapp.biznet";

        var newElection = factory.newResource(namespace, "Election", election.electionId);
        newElection.name = election.name;
        newElection.startTime = election.startTime;
        newElection.endTime = election.endTime;
        newElection.candidates = election.candidates;
        newElection.electionStatus = "Created";
        newElection.commissioner = election.commissioner;
        newElection.electionDate = election.electionDate;

        return getAssetRegistry(newElection.getFullyQualifiedType())
                .then(registry => {
                    var electionRegistry = registry.add(newElection);
                    return electionRegistry
                })
                .then(() => {
                    var electionEvent = factory.newEvent(namespace, "NewElectionNotification");
                    electionEvent.election = newElection;
                    emit(electionEvent);
                });
    
        

    
}