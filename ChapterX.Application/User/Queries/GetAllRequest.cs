using MediatR;

namespace ChapterX.Application.User.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
