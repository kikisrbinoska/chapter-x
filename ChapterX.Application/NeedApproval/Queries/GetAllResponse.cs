namespace ChapterX.Application.NeedApproval.Queries
{
    public record GetAllResponse(IEnumerable<Domain.Entities.NeedApproval> NeedApprovals);
}
