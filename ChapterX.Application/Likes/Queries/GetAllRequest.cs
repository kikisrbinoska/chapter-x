using MediatR;

namespace ChapterX.Application.Likes.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
