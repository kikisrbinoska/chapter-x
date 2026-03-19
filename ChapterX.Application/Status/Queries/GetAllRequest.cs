using MediatR;

namespace ChapterX.Application.Status.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
