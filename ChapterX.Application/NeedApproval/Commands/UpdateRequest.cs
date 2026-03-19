using MediatR;

namespace ChapterX.Application.NeedApproval.Commands
{
    public record UpdateRequest(int Id, bool Approved) : IRequest<UpdateResponse>;
}
