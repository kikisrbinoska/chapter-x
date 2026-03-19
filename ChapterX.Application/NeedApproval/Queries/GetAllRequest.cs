using MediatR;

namespace ChapterX.Application.NeedApproval.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
