using MediatR;

namespace ChapterX.Application.NeedApproval.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
