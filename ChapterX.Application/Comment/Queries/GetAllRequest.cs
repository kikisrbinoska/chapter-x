using MediatR;

namespace ChapterX.Application.Comment.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
