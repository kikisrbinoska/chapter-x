using MediatR;

namespace ChapterX.Application.NeedApproval.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
